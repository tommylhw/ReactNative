/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';

import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { addDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

import CustomColors from './themes/CustomColors';
import HomeScreen from './screens/HomeScreen';
import ProjectScreen from './screens/ProjectScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  /* const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }; */

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}
        initialRouteName='Home'
      >
        <Stack.Screen name='Home' component={ HomeScreen } />
        <Stack.Screen name='Project' component={ ProjectScreen } />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default App;
