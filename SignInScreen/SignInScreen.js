import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SignInScreen() {
  const [phone, setPhone] = useState(''); // Phone input
  const [password, setPassword] = useState(''); // Password input
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to manage password visibility
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation(); // Navigation hook

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // API call to handle sign-in
  const handleSignIn = async () => {
    if (!phone || !password) {
      alert('Please enter your phone number and password.');
      return;
    }

    try {
      const response = await fetch('https://tor.appdevelopers.mobi/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone, // Send phone parameter
          password: password, // Send password parameter
        }),
      });

      const data = await response.json();
      console.log(data); // Log the API response to check the response structure

      if (response.ok && data.status) {
        // If login is successful, navigate to WelcomeScreen with the user's name
        navigation.navigate('WelcomeScreen', { name: data.user?.name});
      } else {
        // Handle error response from the API
        setErrorMessage(data.message || 'Invalid phone number or password.');
      }
    } catch (error) {
      console.log('Error:', error); // Log network or unexpected errors
      setErrorMessage('An error occurred during sign-in. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/logo-center.jpg')} // Replace with your logo URL
        style={styles.logo}
      />
      <View style={styles.signInSection}>
        <Text style={styles.signInText}>Sign In</Text>
        <Text style={styles.welcomeText}>Hi, welcome back! You{'\n'} have been missed...</Text>
      </View>

      {/* Phone Input */}

      <Text style={styles.label}>Phone</Text>
      <View style={styles.inputContainer}>
        <AntDesign name="phone" size={24} color="gray" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <Feather name="lock" size={24} color="gray" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible} // Toggle secureTextEntry based on state
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Feather name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>

      {/* Display error message if any */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Sign Up Section */}
      <Text style={styles.signUpText}>
        Don't have an account?{' '}
        <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUpScreen')}>
          Sign Up
        </Text>
      </Text>

      {/* Privacy Policy */}
      <Text style={styles.privacyPolicyText}>
        By logging in, you agree to our{' '}
        <Text style={styles.privacyPolicyLink}>terms of use</Text> and{' '}
        <Text style={styles.privacyPolicyLink}>privacy policy</Text>.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    justifyContent: 'center',
   
  },
  logo: {
    width: 180, 
    height: 150, 
    alignSelf: 'center',
  
  },
  signInText: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 18,
    
  },
  welcomeText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, 
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  signUpLink: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  privacyPolicyText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#777',
    marginTop: 10,
  },
  privacyPolicyLink: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});
