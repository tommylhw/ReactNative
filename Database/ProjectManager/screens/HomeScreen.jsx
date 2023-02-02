import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

import Realm from "realm";

import CustomColors from '../themes/CustomColors';
import C_InputField from '../components/C_InputField';
import C_AddBtn from '../components/C_AddBtn';

const firebaseConfig = {
  databaseURL: 'https://projectmanagerapp-5d2c9.firebaseio.com',
  apiKey: "AIzaSyCM-yux0gBHhaETQkJjEm8BfGOonuLC4po",
  authDomain: "projectmanagerapp-5d2c9.firebaseapp.com",
  projectId: "projectmanagerapp-5d2c9",
  storageBucket: "projectmanagerapp-5d2c9.appspot.com",
  messagingSenderId: "944568779294",
  appId: "1:944568779294:web:7d545629e5c9f00f16640f",
  measurementId: "G-Z8DK8M17GF"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// firebase.initializeApp(firebaseConfig);

const HomeScreen = ({ navigation }) => {

  const [dataList, setDataList] = useState();

  const getAllData = async () => {

    // get data with ordering
    await firestore().collection("projects").orderBy("created", "desc").get().then(querySnapshot => {
      const data = [];
      querySnapshot.forEach(documentSnapShot => {
        data.push({
          ...documentSnapShot.data(),
          id: documentSnapShot.id,
        });
      });
      setDataList(data);
    }).catch((err) => console.warn(err));
    

    console.log(dataList);
  }

  useEffect(() => {

    getAllData();
    
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* <Text>HomeScreen</Text> */}

      <TouchableOpacity style={styles.projectBtn} onPress={() => navigation.navigate('Project', {
        dataList
      })}>
        <Text style={styles.projectBtnText}>See All Projects</Text>
      </TouchableOpacity>

      <View style={styles.addGroupContainer}>

        <C_InputField placeholder='Searchf a project' />

        <View style={styles.addTaskContainer}>
          <C_InputField placeholder='Enter a new task' />
          <C_AddBtn />
        </View>

        {/* <TouchableOpacity style={styles.addBtn}>
          <AntDesign name='plus' size={24} color='#fff' />
        </TouchableOpacity> */}
      </View>

      <View style={styles.dataContainer}>
        {/* {dataList} */}
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
    // flexDirection: 'row',
    // alignItems: 'flex-end',
    // justifyContent: 'space-between',
  },

  addTaskContainer: {
    flexDirection: 'row',
    width: '100%',
  },

  dataContainer: {
    // borderWidth: 2,
    marginVertical: 30,
    width: '100%',
    height: 1200,
  },

});

export default HomeScreen;
