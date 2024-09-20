import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './SignInScreen/SignInScreen'; 
import SignUpScreen from './SignUpScreen/SignUpScreen';
import WelcomeScreen from './WelcomeScreen/WelcomeScreen'; // Import WelcomeScreen

// SplashScreen Component
function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* New image added to the top-right corner */}
      <Image
        source={require('./assets/top-right-image.jpg')}
        style={styles.topRightImage}
      />

      {/* Centered Logo */}
      <Image
        source={require('./assets/logo-center.jpg')}
        style={styles.logo}
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Sparkle & Shine Transform</Text>
        <Text style={styles.subtitle}>Your Drive with Every Wash!</Text>
      </View>

      {/* Button to start */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignInScreen')}
      >
        <Text style={styles.buttonText}>Let's Start</Text>
      </TouchableOpacity>

      {/* "Already have an account? Sign In" section */}
      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require('./assets/top-left-image.jpg')}
        style={styles.topeLeftImage}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        {/* SignInScreen */}
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{ title: 'Sign In' }}
        />

        {/* SignUpScreen */}
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ title: 'Sign Up' }}
        />

        {/* WelcomeScreen */}
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ title: 'Welcome' }}  // Title for the Welcome screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
  },
  topRightImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 170,
    height: 300,
    resizeMode: 'contain',
  },
  topeLeftImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 180,
    height: 300,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 5,
    marginTop: 9,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 19,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 110,
    borderRadius: 13,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signInText: {
    fontSize: 14,
    color: '#000',
  },
  signInLink: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

