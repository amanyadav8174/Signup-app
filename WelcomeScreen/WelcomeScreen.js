import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = ({ route }) => {
  const navigation = useNavigation(); // Initialize navigation
  const { name } = route.params || {}; // Safely get the name parameter

  // Logout function
  const handleLogout = () => {
    // Navigate back to SignInScreen on logout
    navigation.navigate('SignInScreen');
  };

  return (
    <View style={styles.container}>
      {/* Logo at the top center */}
      <Image
        source={require('../assets/logo-center.jpg')} // Replace with your logo image path
        style={styles.logo}
      />

      {/* Welcome message */}
      <Text style={styles.welcomeText}>Welcome, {name ? name : 'Guest'}!</Text>

      {/* Spacer to push the logout button to the center */}
      <View style={styles.spacer} />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 150, 
    height: 150, 
    marginTop: 40, 
    marginBottom: 20, 
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  spacer: {
    flex: 1, 
  },
  logoutButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 80,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;

