import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView , FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { db, getFirestore, collection, addDoc } from '../firebase/firebaseIndex';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

// import Realm from "realm";
// import { TaskListSchema, TaskSchema, updateTaskList, deleteTaskList, queryAllTaskList } from '../data/DataSchema';
// import realm from '../data/DataSchema';
// import realm from "realm";


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



const ProjectScreen = () => {

  // const [dataSet, setDataSet] = useState([]);

  /* const loadData = () => {
    queryAllTaskList().then((data) => {
      setDataSet({data});
    }).catch((error) => console.warn(error));
    console.log('Data loaded');
    console.log(dataSet);
  }

  useEffect(() => {
    const getRealmInstance = async () => {
      try {
        Realm = await Realm.open({
          path: 'ProjectManagerApp',
          schema: [TaskListSchema, TaskSchema],
        });
      } catch (error) {
        console.log(error);
      }
    };

    // var data = Realm.objects('TaskList');
    // setDataSet([...data]);
    getRealmInstance();
  }, []);

  const DogSchema = {
    name: "Dog",
    properties: {
     _id: "objectId",
     name: "string",
     age: "int",
     breed: "string?"
    },
    primaryKey: "_id",
  };
  
  async function example() {
    const app = new Realm.App({ id: "application-0-rpjlr" });
  
   // MongoDB Realm offers built-in Auth to secure Syncing data
   const credentials = Realm.Credentials.anonymous();
   await app.logIn(credentials);
  
   // Data can be Synced with a simple configuration
   const config = {
    schema: [DogSchema],
      sync: {
       user: app.currentUser,
       partitionValue: "MyPartitionValue"
      },
    };
  
    const realm = await Realm.open(config);
  
   // Realm Writes are transactional and Sync automatically
   realm.write(() => {
     realm.create("Dog", {
       _id: new ObjectId(),
        name: "Princess Gracie",
        age: 6,
     });
   });
   // Data Synced onto a device can be queried locally
   const allDogs = realm.objects("Dog");
   const olderDogs = alLDogs.filtered("age > 5");
  }

  useEffect(() => {
    example()
  }, []); */
  

  const [projectName, setProjectName] = useState('');
  const [projectDone, setProjectDone] = useState();

  const [projectList, setProjectList] = useState();

  const addData = async () => {

    // check if the project already exists
    const nameList = [];
    projectList.forEach((data) => {
      nameList.push(data.projectName.toString());
    })
    console.log(nameList);

    if (nameList.includes(projectName)) {
      alert('This project exist already');
      return;
    }

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
    }).then(() => {
      // console.log(firebase.firestore.FieldValue.serverTimestamp());
      console.log(projectName, 'data added');
      getAllData();
    }).catch((err) => {
      console.warn(err);
    });

    // clear the inputfield
    setProjectName('');
    
  }

  const getAllData = async () => {
    // Normal get data
    /* firestore().collection('projects').onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach(documentSnapshot => {
      data.push({
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
      });
     });
     setProjectList(data);
    }); */

    // get data with ordering
    await firestore().collection("projects").orderBy("created", "desc").get().then(querySnapshot => {
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
