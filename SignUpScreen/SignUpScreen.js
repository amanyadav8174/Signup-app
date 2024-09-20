import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox'; // Use expo-checkbox for Expo projects
import { useNavigation } from '@react-navigation/native'; // Import navigation

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); // Use phone instead of email
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false); // State to manage checkbox
  const navigation = useNavigation(); // Initialize navigation

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Async function to handle sign-up with the API
  const handleSignUp = async () => {
    if (!name || !phone || !password) {
      alert('Please fill out all fields.');
      return;
    }

    if (!isTermsAccepted) {
      alert('Please accept the terms and conditions.');
      return;
    }

    try {
      const response = await fetch('https://tor.appdevelopers.mobi/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          phone: phone, // Use phone number instead of email
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data); 

      if (response.ok) {
        // If signup is successful, navigate to WelcomeScreen
        navigation.navigate('WelcomeScreen', { name: data.name || name });
      } else {
        console.log("API Response: ", data); // Log API response for debugging
        setErrorMessage(data.message || 'An error occurred during sign-up.');
      }
    } catch (error) {
      console.log("Error: ", error); // Log error for debugging
      setErrorMessage('An error occurred during sign-up. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Logo */}
      <Image
        source={require('../assets/logo-center.jpg')}
        style={styles.logo}
      />
      <View style={styles.signInSection}>
        <Text style={styles.signInText}>Sign Up</Text>
        <Text style={styles.welcomeText}>Create a new account{'\n'} and start your journey!</Text>
      </View>

      {/* Name Input */}
      <Text style={styles.label}>Name</Text>
      <View style={styles.inputContainer}>
        <AntDesign name="user" size={24} color="gray" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Phone Input */}
      <Text style={styles.label}>Phone</Text>
      <View style={styles.inputContainer}>
        <AntDesign name="phone" size={24} color="gray" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="1234567890"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad" // Ensure numeric keyboard for phone number
        />
      </View>

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <Feather name="lock" size={24} color="gray" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Feather name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>

      {/* Checkbox for Terms and Conditions */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isTermsAccepted}
          onValueChange={setIsTermsAccepted}
          style={styles.checkbox}
          color={isTermsAccepted ? '#007BFF' : undefined}
        />
        <Text style={styles.checkboxLabel}>
          I agree to the{' '}
          <Text style={styles.linkText}>Terms and Conditions</Text>
        </Text>
      </View>

      {/* Display error message if any */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
        <Text style={styles.signInButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Already have an account link */}
      <Text style={styles.signUpText}>
        Already have an account?{' '}
        <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignInScreen')}>
          Sign In
        </Text>
      </Text>
    </KeyboardAvoidingView>
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
    height: 100,
    alignSelf: 'center',
    marginTop: -40,
  },
  signInSection: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  signInText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    color: '#666',
    fontSize: 14,
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
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
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  signUpLink: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
});
