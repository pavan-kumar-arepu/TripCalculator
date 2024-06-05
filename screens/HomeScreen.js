import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import {useNavigation} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {auth} from '../config/firebase';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/slices/user';

const items = [
  {
    id: 1,
    place: 'Machilipatnam',
    country: 'India',
  },
  {
    id: 2,
    place: 'Hyderabad',
    country: 'India',
  },
  {
    id: 3,
    place: 'Bangalore',
    country: 'India',
  },
  {
    id: 4,
    place: 'Pune',
    country: 'India',
  },
];
export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear user state after sign-out
      dispatch(setUser(null));
      navigation.navigate('Welcome');
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
        <View style={{height: 300}}>
          <FlatList
            data={items}
            numColumns={2}
            ListEmptyComponent={
              <EmptyList message={'You have not added any trips'} />
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
