import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import BackButton from '../components/backButton';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/loading';
import Snackbar from 'react-native-snackbar';
import {tripsCollection} from '../config/firebase';
import {useSelector} from 'react-redux';
import {addDoc} from 'firebase/firestore';

export default function AddTripScreen() {
  const [place, setPlace] = useState();
  const [country, setCountry] = useState();
  const {user} = useSelector(state => state.user);

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleAddTrip = async () => {
    console.log(user);
    if (place && country) {
      setLoading(true);
      try {
        const doc = await addDoc(tripsCollection, {
          place,
          country,
          userId: user.uid,
        });
        setLoading(false);
        if (doc && doc.id) {
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error adding document: ', error);
        setLoading(false);
        Snackbar.show({
          text: 'Failed to add trip. Please try again!',
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Place and country are required!',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View className="relative mt-5">
          <Text className={`${colors.heading} text-xl font-bold text-center`}>
            Add Trip
          </Text>
          <View className="absolute top-0 left-0">
            <BackButton />
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-72 w-72"
              source={require('../assets/images/4.png')}
            />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>
              {' '}
              Which place you visited?
            </Text>
            <TextInput
              value={place}
              onChangeText={value => setPlace(value)}
              className="p-2 bg-white rounded-full mb-3"
            />
            <Text className={`${colors.heading} text-lg font-bold`}>
              {' '}
              From which country?
            </Text>
            <TextInput
              value={country}
              onChangeText={value => setCountry(value)}
              className="p-2 bg-white rounded-full mb-3"
            />
          </View>
        </View>

        <View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleAddTrip}
              style={{backgroundColor: colors.button}}
              className="my-6 rounded-full p-3 shadow-sm mx-2">
              <Text className="text-center text-white text-lg font-bold">
                {' '}
                Add Trip{' '}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
