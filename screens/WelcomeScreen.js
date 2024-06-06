import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <View className="h-full flex justify-around">
        <View className="flex-row justify-center mt-10">
          <Image
            source={require('../assets/images/welcomenew.png')}
            className="h-96 w-96 shadow"
          />
        </View>
        <View className="mx-5 mb-20">
          <Text
            className={`text-center font-bold text-4xl ${colors.heading} mb-10`}>
            Travel Expense
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="showdow p-3 rounded-full mb-5"
            style={{backgroundColor: colors.button}}>
            <Text className="text-center text-white text-lg font-bold">
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            className="showdow p-3 rounded-full mb-5"
            style={{backgroundColor: colors.button}}>
            <Text className="text-center text-white font-bold text-lg">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
