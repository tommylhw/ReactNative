import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';

const C_InputField = (props) => {
  return ( 
    <TextInput 
      style={styles.inputField}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      value={props.value}
    />
   );
}

const styles = StyleSheet.create({
  inputField: {
    // width: '100%',
    flexGrow: 1,
    height: 50,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },


});

export default C_InputField;