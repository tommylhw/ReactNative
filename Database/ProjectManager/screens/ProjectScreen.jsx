import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { db, getFirestore, collection, addDoc } from '../firebase/firebaseIndex';
// import Realm from "realm";
import { TaskListSchema, TaskSchema, updateTaskList, deleteTaskList, queryAllTaskList } from '../data/DataSchema';
// import realm from '../data/DataSchema';
// import realm from "realm";


import CustomColors from '../themes/CustomColors';
import C_InputField from '../components/C_InputField';
import C_AddBtn from '../components/C_AddBtn';



const ProjectScreen = () => {

  // const [dataSet, setDataSet] = useState([]);

  /* const loadData = () => {
    queryAllTaskList().then((data) => {
      setDataSet({data});
    }).catch((error) => console.warn(error));
    console.log('Data loaded');
    console.log(dataSet);
  } */

  /* useEffect(() => {
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
  }, []); */

  /* const DogSchema = {
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
  
  
  const [projectName, setProjectName] = useState();

  const addProject = async () => {
    console.log(projectName);

    try {
      const docRef = await addDoc(collection(db, "projects"), {
        name: projectName,
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputFieldContainer}>
          <C_InputField placeholder='Enter a new project' onChangeText={(text) => setProjectName(text)} />
        </View>

        <C_AddBtn onPress={() => addProject()} />
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
