import {Text, View} from 'react-native';
import React from 'react';
import {categoryBG, colors} from '../theme';

export default function ExpenseCard({item}) {
  return (
    <View
      style={{backgroundColor: categoryBG[item.category]}}
      className="flex-row justify-between items-center p-3 mb-3 bg-red-300 rounded-2xl">
      <View>
        <Text className={`${colors.heading} font-bold`}>{item.title}</Text>
        <Text className={`${colors.heading} text-xs`}>{item.category}</Text>
      </View>
      {/* <View>
        <Text>${item.amount}</Text>
      </View> */}
      <View>
        <Text>${item.amount}</Text>
      </View>
    </View>
  );
}
