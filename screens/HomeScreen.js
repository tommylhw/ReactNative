import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import CustomDrawerBtn from '../components/CustomDrawerBtn';
import AddBtn from '../components/AddBtn';
import Tasks from '../components/Tasks';

const HomeScreen = () => {
  return ( 
    <View style={styles.frame}>
      {/* <Text>Home Screen</Text> */}

      {/* header */}
      <View style={styles.drawerBtn}><CustomDrawerBtn /></View>

      {/* body */}
      <ScrollView style={styles.mainBody}>

        <View style={styles.cateSelectorContainer}></View>

        <View style={styles.dashboardContainer}></View>

        <View style={styles.dateSelectorContainer}></View>

        <View style={styles.tasksContainer}>
          <Tasks />
        </View>

        
      </ScrollView>

      <View style={styles.addBtn}><AddBtn /></View>


      <StatusBar style='auto' />
      
    </View>
   );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },

  drawerBtn: {
    // borderWidth: 2,
    position: 'absolute',
    top: 25,
    left: 25,
  },

  mainBody: {
    borderWidth: 2,
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 60,
    paddingHorizontal: 38,
  },

  cateSelectorContainer: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    marginVertical: 20,
  },

  dashboardContainer: {
    width: '100%',
    height: 95,
    borderWidth: 2,
  },

  dateSelectorContainer: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    marginVertical: 20,
  },

  tasksContainer: {
    width: '100%',
    // height: 800,
    borderWidth: 2,
  },

  addBtn: {
    position: 'absolute',
    bottom: 30,
  },

});

export default HomeScreen;