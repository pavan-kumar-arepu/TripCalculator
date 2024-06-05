import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import BackButton from '../components/backButton';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';

export default function SignUpScreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigation = useNavigation();

  const handleSignup = () => {
    if (email && password) {
      // Proceed to save data to FireStore
      navigation.goBack();
      navigation.navigate('Home');
    } else {
      // Show Error
    }
  };
  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View className="relative mt-2">
          <Text className={`${colors.heading} text-xl font-bold text-center`}>
            Sign Up
          </Text>
          <View className="absolute top-0 left-0">
            <BackButton />
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-72 w-72"
              source={require('../assets/images/login.png')}
            />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>
              {' '}
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={value => setEmail(value)}
              className="p-2 bg-white rounded-full mb-3"
            />
            <Text className={`${colors.heading} text-lg font-bold`}>
              {' '}
              Password
            </Text>
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={value => setPassword(value)}
              className="p-2 bg-white rounded-full mb-3"
            />
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={handleSignup}
            style={{backgroundColor: colors.button}}
            className="my-6 rounded-full p-3 shadow-sm mx-2">
            <Text className="text-center text-white text-lg font-bold">
              {' '}
              Sign Up{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
