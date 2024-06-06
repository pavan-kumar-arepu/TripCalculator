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
import BackButton from '../components/backButton';
import ExpenseCard from '../components/expenseCard';
import {useIsFocused} from '@react-navigation/native'; // Correct import for useIsFocused
import {expenseCollection} from '../config/firebase';
import {useState} from 'react';
import {useEffect} from 'react';
import {getDocs, query as firestoreQuery, where} from 'firebase/firestore'; // Proper import

export default function TripExpensesScreen(props) {
  console.log('APK: Props', props);
  const {id, place, country} = props.route.params;
  const navigation = useNavigation();

  const [expenses, setExpenses] = useState([]);
  const isFocused = useIsFocused();

  const fetchExpenses = async () => {
    const expenseQuery = firestoreQuery(
      expenseCollection,
      where('tripId', '==', id),
    );
    const querySnapshot = await getDocs(expenseQuery);

    let data = [];
    querySnapshot.forEach(doc => {
      console.log('APK: Document', doc.data());
      data.push({...doc.data(), id: doc.id});
    });
    setExpenses(data);
  };

  useEffect(() => {
    if (isFocused) {
      fetchExpenses();
    }
  }, [isFocused]);

  return (
    <ScreenWrapper className="flex-1">
      <View className="px-4">
        <View className="relative mt-5">
          <View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>
              {place}
            </Text>
            <Text className={`${colors.heading} text-xl text-center`}>
              {country}
            </Text>
          </View>
          <View className="absolute top-0 left-0">
            <BackButton />
          </View>
        </View>
        {/* HighlightImage */}
        <View className="flex-row justify-center items-center rounded-xl mb-4">
          <Image
            source={require('../assets/images/7.png')}
            className="w-80 h-80"
          />
        </View>
        <View className="space-y-3">
          <View className="flex-row justify-between items-center">
            <Text className={`${colors.heading} font-bold text-xl`}>
              Expenses
            </Text>
            {/* Add Trips*/}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddExpense', {id, place, country})
              }
              className="p-2 px-3 bg-white border border-gray-200 roundded-full">
              <Text className={colors.heading}>Add Expense</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 300}}>
            <FlatList
              data={expenses}
              ListEmptyComponent={
                <EmptyList message={'You have not added any expenses'} />
              }
              keyExtractor={items => items.id}
              showsVerticalScrollIndicator={true}
              className="mx-1"
              renderItem={({item}) => {
                return <ExpenseCard item={item} />;
              }}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
