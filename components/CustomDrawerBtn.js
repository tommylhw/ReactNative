import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign, Fontisto, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Color from '../themes/Color.js';
import NavBtn from '../src/NavBtn.svg'

const CustomDrawerBtn = () => {

  const useNav = useNavigation();

  return ( 
    <TouchableOpacity onPress={() => useNav.toggleDrawer()}>
      {/* <Fontisto name="nav-icon-a" size={24} color={Color.Dark} /> */}
      <EvilIcons name="navicon" size={35} color={Color.Dark} />
      {/* <NavBtn /> */}
    </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


});

export default CustomDrawerBtn;