import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import BackButton from '../components/backButton';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {categories} from '../constants';

export default function AddExpenseScreen() {
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState();

  const navigation = useNavigation();

  const handleAddExpenses = () => {
    if (title && amount && category) {
      // Proceed to save data to FireStore
      console.log('title', title);
      console.log('amount', amount);
      console.log('category', category);

      navigation.goBack();
    } else {
      // Show Error
      // console.log('title', title);
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
              source={require('../assets/images/expenseBanner.png')}
            />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>
              {' '}
              For what?
            </Text>
            <TextInput
              value={title}
              onChangeText={value => setTitle(value)}
              className="p-2 bg-white rounded-full mb-3"
            />
            <Text className={`${colors.heading} text-lg font-bold`}>
              {' '}
              How much?
            </Text>
            <TextInput
              value={amount}
              onChangeText={value => setAmount(value)}
              className="p-2 bg-white rounded-full mb-3"
            />
          </View>
          <View className="mx-2 space-x-2">
            <Text className={`${colors.heading} text-lg font-bold`}>
              {' '}
              Category
            </Text>
            <View className="flex-row flex-wrap items-center">
              {categories.map(cat => {
                let bgColor = 'bg-white';
                if (cat.value == category) bgColor = 'bg-green-200';
                return (
                  <TouchableOpacity
                    onPress={() => setCategory(cat.value)}
                    key={cat.value}
                    className={`rounded-full ${bgColor} px-4 p-3 mb-2 mr-3`}>
                    <Text>{cat.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={handleAddExpenses}
            style={{backgroundColor: colors.button}}
            className="my-6 rounded-full p-3 shadow-sm mx-2">
            <Text className="text-center text-white text-lg font-bold">
              AddExpenses
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
