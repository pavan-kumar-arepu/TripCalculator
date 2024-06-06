import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import {useNavigation} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {auth, tripsCollection} from '../config/firebase';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../redux/slices/user';
import {isFulfilled} from '@reduxjs/toolkit';
import {useIsFocused} from '@react-navigation/native'; // Correct import for useIsFocused
import {getDocs, query as firestoreQuery, where} from 'firebase/firestore'; // Proper import

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const [trips, setTrips] = useState([]);
  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const tripsQuery = firestoreQuery(
      tripsCollection,
      where('userId', '==', user.uid),
    );
    const querySnapshot = await getDocs(tripsQuery);

    let data = [];
    querySnapshot.forEach(doc => {
      console.log('APK: Document', doc.data());
      data.push({...doc.data(), id: doc.id});
    });
    setTrips(data);
  };

  useEffect(() => {
    if (isFocused) {
      fetchTrips();
    }
  }, [isFocused]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear user state after sign-out
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <ScreenWrapper className="flex-1">
      <View className="flex-row justify-between items-center p-4">
        {/* Top Title */}
        <Text className={`${colors.heading} font-bold text-3xl`}>Welcome</Text>
        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="p-2 px-3 bg-white border border-gray-200 roundded-full">
          <Text className={colors.heading}>Logout</Text>
        </TouchableOpacity>
      </View>
      {/* HighlightImage */}
      <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
        <Image
          source={require('../assets/images/banner.png')}
          className="w-60 h-60"
        />
      </View>
      <View className="px-4">
        <View className="flex-row justify-between items-center">
          <Text className={`${colors.heading} font-bold text-xl`}>
            RecentTrips
          </Text>
          {/* Add Trips*/}
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTrip')}
            className="p-2 px-3 bg-white border border-gray-200 roundded-full">
            <Text className={colors.heading}>Add Trips</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 20}}>
          <Text></Text>
        </View>
        <View style={{height: 400}}>
          <FlatList
            data={trips}
            numColumns={2}
            ListEmptyComponent={
              <EmptyList
                message={'You do not have any trips yet, its time to start!'}
              />
            }
            keyExtractor={items => items.id}
            showsVerticalScrollIndicator={true}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            className="mx-1"
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('TripExpense', {...item})}
                  className="bg-white p-3 rounded-2xl mb-3 showdow-sm">
                  <View>
                    <Image source={randomImage()} className="w-36 h-60 mb-2" />
                    <Text className={`${colors.heading} font-bold`}>
                      {item.place}
                    </Text>
                    <Text className={`${colors.heading} font-bold`}>
                      {item.country}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
