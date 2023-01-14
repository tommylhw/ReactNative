import React, { Component, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import Test from './test/test';

import CustomDrawer from './components/CustomDrawer';




const HomeNav = () => {

  const Stack = createNativeStackNavigator();

  return (

      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Add' component={AddScreen} />
      </Stack.Navigator>

  )
}

export default function App() {
  
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator 
        screenOptions={{
          headerShown: false,
          // drawerStyle: {
          //   backgroundColor: 'transparent',
          //   padding: 10,
          // }
        }} 
        initialRouteName='Home'
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen name='Home' component={HomeNav} />
        <Drawer.Screen name='Add' component={AddScreen} />
        <Drawer.Screen name='test' component={Test} />
      </Drawer.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});




