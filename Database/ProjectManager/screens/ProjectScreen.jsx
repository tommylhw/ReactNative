import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Realm from "realm";


import CustomColors from '../themes/CustomColors';
import C_InputField from '../components/C_InputField';
import C_AddBtn from '../components/C_AddBtn';

const ProjectScreen = () => {

  const [dataSet, setDataSet] = useState(null);

  var realm = new Realm({path: 'ProjectManagerApp.realm'});

  realm.write(() => {

  });

  
  
  


  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputFieldContainer}><C_InputField placeholder='Enter a new project' /></View>

        <C_AddBtn />
      </View>

      <View style={styles.projectContainer}>

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

  inputContainer: {
    width: '100%',
    marginVertical: 30,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  inputFieldContainer: {
    width: '80%',
  },

  projectContainer: {
    borderWidth: 2,
    height: 1200,
  }

});

export default ProjectScreen;
