import {View, Text, Touchable, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';

export default function HomeScreen() {
  return (
    <ScreenWrapper className="flex-1">
      <View className="flex-row justify-between items-center p-4">
        {/* Top Title */}
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>
          Trip Tracker
        </Text>
        {/* Logout Button */}
        <TouchableOpacity className="p-2 px-3 bg-white border border-gray-200 roundded-full">
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
          <TouchableOpacity className="p-2 px-3 bg-white border border-gray-200 roundded-full">
            <Text className={colors.heading}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
