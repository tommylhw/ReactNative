import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView , FlatList} from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { db, getFirestore, collection, addDoc } from '../firebase/firebaseIndex';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

import CustomColors from '../themes/CustomColors';
import C_InputField from '../components/C_InputField';
import C_AddBtn from '../components/C_AddBtn';
import C_ProjectItem from '../components/C_ProjectItem';

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

// const db = getFirestore(initializeApp(firebaseConfig));

// firebase.initializeApp(firebaseConfig);
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// var database = firebase.firestore();



const ProjectScreen = (props) => {  

  const [projectName, setProjectName] = useState('');

  const [projectList, setProjectList] = useState();

  // const { dataList } = props.route.params;

  const addData = async () => {

    // check if the project already exists
    /* const nameList = [];
     projectList.forEach((data) => {
      nameList.push(data.projectName.toString());
    })
    console.log(nameList); */

    const nameList = projectList.map(item => item.projectName);
    if (nameList.includes(projectName)) {
      alert('This project exist already');
      return;
    }
    console.log(nameList);

    // Check if user input is empty
    if (!projectName.trim()) {
      alert('Please enter the project name.');
      return;
    }

    firestore().collection('projects').add({
      projectName: projectName,
      projectDone: false,
      numberOfTask: 3,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      tasks: [],
    }).then(() => {
      // console.log(firebase.firestore.FieldValue.serverTimestamp());
      console.log(projectName, 'data added');
      getAllData();
      // setProjectList(props.route.params);
    }).catch((err) => {
      console.warn(err);
    });

    // clear the inputfield
    setProjectName('');
    
  }

  const getAllData = () => {

    // get data with ordering
    firestore().collection("projects").orderBy("created", "desc").get().then(querySnapshot => {
      const data = [];
      querySnapshot.forEach(documentSnapShot => {
        data.push({
          ...documentSnapShot.data(),
          id: documentSnapShot.id,
        });
      });
      setProjectList(data);
    });
    

    console.log(projectList);
  }

  const delProject = async (id) => {

    await firestore().collection("projects").doc(projectList[id].id).delete().then(() => {
      console.log('deleted');
      getAllData();
      
    }).catch((err) => {
      console.warn(err);
    });
  }

  const updateProject = (id) => {
    getAllData();
    
    console.log('=====', 'updateProject()', '=====');

    firestore().collection("projects").doc(projectList[id].id).update({
      'projectDone': !projectList[id].projectDone,
    }).then(() => {
      console.log(projectList[id].id, 'updated');
    }).catch((err) => {
      console.log(err);
    })
    
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
    <ScrollView horizontal={false} style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputFieldContainer}>
          <C_InputField placeholder='Enter a new project' onChangeText={(text) => setProjectName(text)} value={projectName} />
        </View>

        <C_AddBtn onPress={() => addData()} />
      </View>

      <View style={styles.projectListContainer}>
        <FlatList 
          data={projectList}
          renderItem={({item, index}) => (
            <C_ProjectItem project={item} numberOfTasks={item.numberOfTask} index={index} deleteProject={() => delProject(index)} updateProjectStatus={() => updateProject(index)} />
          )}
        />
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: CustomColors.BG,
    // alignItems: 'center',
    paddingHorizontal: '10%'
  },

  inputContainer: {
    width: '100%',
    marginVertical: 30,
    // borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  inputFieldContainer: {
    width: '80%',
  },

  projectListContainer: {
    // borderWidth: 2,
    // height: 1200,
    marginBottom: 30,
  },

});

export default ProjectScreen;
