import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CustomColors from '../themes/CustomColors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const C_AddBtn = (props) => {
  return ( 
    <TouchableOpacity style={styles.addBtn} onPress={props.onPress}>
      {/* <Text>Btn</Text> */}
      {/* <Ionicons name='add' size={24} color='#fff' /> */}
      <AntDesign name='plus' size={24} color='#fff' />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: CustomColors.Primary,
    height: 50,
    width: 50,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },


});

export default C_AddBtn;