import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import AddTripScreen from '../screens/AddTripScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignupScreen from '../screens/SignupScreen';
import {useSelector, useDispatch} from 'react-redux';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../config/firebase';
import {setUser, setUserLoading} from '../redux/slices/user';
import {useEffect} from 'react';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  /*
  onAuthStateChanged(auth, u => {
    console.log('got user: ', u);
    if (u) {
      const uData = {
        email: u.email,
        uid: u.uid,
      };
      dispatch(setUser(uData));
    } else {
      dispatch(setUser(null));
    }
  });

  */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, newUser => {
      console.log('APK: onAuthStateChanged Called');
      if (newUser) {
        console.log('APK: User Full Details ', newUser);
        console.log('APK: User UID ', newUser.uid);
        console.log('APK: User email ', newUser.email);
        console.log('APK: User displayName ', newUser.displayName);
        const userData = {
          uid: newUser.uid,
          email: newUser.email,
          displayName: newUser.displayName,
        };
        dispatch(setUser(userData));
      } else {
        console.log('APK: User Full Details ', newUser);
        console.log('APK: User UID ', newUser.uid);
        console.log('APK: User email ', newUser.email);
        console.log('APK: User displayName ', newUser.displayName);
        dispatch(setUser(null));
      }
      dispatch(setUserLoading(false));
    });

    // dispatch(setUserLoading(true));

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  // if (userLoading) {
  //   // You can return a loading spinner or some kind of loading screen here
  //   return null;
  // }

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="AddExpense"
            component={AddExpenseScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="AddTrip"
            component={AddTripScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="TripExpense"
            component={TripExpensesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{headerShown: false, presentation: 'modal'}}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{headerShown: false, presentation: 'modal'}}
            name="SignUp"
            component={SignupScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="AddExpense"
            component={AddExpenseScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="AddTrip"
            component={AddTripScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="TripExpense"
            component={TripExpensesScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Welcome"
            component={WelcomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
