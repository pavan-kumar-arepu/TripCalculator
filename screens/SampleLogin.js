import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { styles, colors } from '../theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={[styles.heading, { fontSize: 24, fontWeight: 'bold', textAlign: 'center' }]}>
          Sign In
        </Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/login.png')}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={value => setEmail(value)}
            style={styles.input}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            secureTextEntry
            onChangeText={value => setPassword(value)}
            style={styles.input}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {}}
        style={[styles.button, { backgroundColor: colors.button }]}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={styles.switchScreenText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
