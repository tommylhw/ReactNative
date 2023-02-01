import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Realm from "realm";

import CustomColors from '../themes/CustomColors';
import C_InputField from '../components/C_InputField';
import C_AddBtn from '../components/C_AddBtn';

const HomeScreen = ({ navigation }) => {



  return (
    <ScrollView style={styles.container}>
      {/* <Text>HomeScreen</Text> */}

      <TouchableOpacity style={styles.projectBtn} onPress={() => navigation.navigate('Project')}>
        <Text style={styles.projectBtnText}>See All Projects</Text>
      </TouchableOpacity>

      <View style={styles.addGroupContainer}>
        <View style={styles.inputContainer}>
          <C_InputField placeholder='Searchf a project' />
          <C_InputField placeholder='Enter a new task' />
        </View>

        {/* <TouchableOpacity style={styles.addBtn}>
          <AntDesign name='plus' size={24} color='#fff' />
        </TouchableOpacity> */}

        <C_AddBtn />
      </View>

      <View style={styles.dataContainer}>
        
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: CustomColors.BG,
    // alignItems: 'center',
    paddingHorizontal: '10%'
  },

  projectBtn: {
    marginVertical: 30,
    width: '100%',
    backgroundColor: CustomColors.Primary,
    paddingVertical: 15,
    borderRadius: 10,
  },

  projectBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  addGroupContainer: {
    width: '100%',
    // borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  inputContainer: {
    width: '80%',
    // borderWidth: 2,
  },

  /* addBtn: {
    backgroundColor: CustomColors.Primary,
    height: 50,
    width: 50,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }, */

  dataContainer: {
    // borderWidth: 2,
    marginVertical: 30,
    width: '100%',
    height: 1200,
  },

});

export default HomeScreen;
