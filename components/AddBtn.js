import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign, Fontisto, EvilIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Color from '../themes/Color';


const AddBtn = () => {

  const useNav = useNavigation();

  return ( 
    <TouchableOpacity style={styles.addBtn} onPress={() => useNav.navigate('Add')}>
      <Ionicons name="add" size={26} color="#fff" />
    </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: Color.Secondary,
    padding: 12,
    borderRadius: 10,
  },

});

export default AddBtn;