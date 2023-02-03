import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { SelectList } from 'react-native-dropdown-select-list';

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

  const [dataList, setDataList] = useState([]);

  const [selectList, setSelectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const [taskName, setTaskName] = useState('');

  const storeSelectedProject = () => {
    getAllData();

    var selectedId;

    firestore().collection('projects').where('projectName', '==', selectedProject).get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapShot => {
        selectedId = documentSnapShot.id
      });
      setSelectedProjectId(selectedId);
    });

  }

  // add task
  const addTask = () =>{

    console.log('Adding', selectedProjectId);

    firestore().collection("projects").doc(selectedProjectId).update({
      'tasks': [... taskName],
    }).then(() => {
      console.log(selectedProjectId, 'updated');
    }).catch((err) => {
      console.log(err);
    });

    setTaskName('');

  }

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

      const nameList = data.map((item) => item.projectName);
      setSelectList(nameList);
      
    }).catch((err) => console.warn(err));
    

    console.log(dataList);
  }

  useEffect(() => {

    getAllData();
    
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getAllData();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {/* <Text>HomeScreen</Text> */}

      <TouchableOpacity style={styles.projectBtn} onPress={() => navigation.navigate('Project')}>
        <Text style={styles.projectBtnText}>See All Projects</Text>
      </TouchableOpacity>

      <View style={styles.addGroupContainer}>

        {/* <C_InputField placeholder='Search a project' /> */}
        <SelectList 
          setSelected={(val) => setSelectedProject(val)} 
          data={selectList}
          save="value"
          search={false}
          onSelect={() => storeSelectedProject()}
          boxStyles={{backgroundColor: '#fff'}}
          dropdownStyles={{backgroundColor: '#fff'}}
        />

        <View style={styles.addTaskContainer}>
          <C_InputField placeholder='Enter a new task' onChangeText={(text) => setTaskName(text)} value={taskName} />
          <C_AddBtn onPress={() => addTask()} />
        </View>

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
