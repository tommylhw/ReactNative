import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome, AntDesign, Fontisto, EvilIcons } from '@expo/vector-icons';

import Color from '../themes/Color.js';

const InputField = (props) => {

  return ( 
    <TextInput 
      style={styles.inputField}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
    />
   );
}

const styles = StyleSheet.create({
  inputField: {
    width: '100%',
    height: 30,
    borderBottomWidth: 1.5,
    borderColor: '#fff',
  },


});

export default InputField;