import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign, Fontisto, EvilIcons, Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';


import Color from '../themes/Color';


const BackBtn = () => {

  const useNav = useNavigation();

  return ( 
    <TouchableOpacity onPress={() => useNav.goBack()}>
      <Ionicons name="ios-arrow-back-sharp" size={30} color={Color.PrimaryDark} />
    </TouchableOpacity>
   );
}

export default BackBtn;