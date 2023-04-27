import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { getDatabase, ref, set, onValue, child, get } from 'firebase/database';  

// Initialize Firebase
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyC8ek0UC5JI6HsFvLiB2JowHvIUgoGY7Hk',
  authDomain: 'todotracker-708ae.firebaseapp.com',
  projectId: 'todotracker-708ae',
  storageBucket: 'todotracker-708ae.appspot.com',
  messagingSenderId: '811696424289',
  appId: "1:811696424289:web:6c597662d856025aafb120",
  databaseURL: 'https://todotracker-708ae-default-rtdb.asia-southeast1.firebasedatabase.app/',
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const getData = () => {
  var data;
  var arrayData;

  onValue(ref(database, 'tasks'), (snapshot) => {
    data = snapshot.val();
    console.log('number of tasks: ' + Object.keys(data).length);

    arrayData = Object.entries(data);
    console.log(arrayData);
    console.log(typeof(arrayData));
  });
  // console.log(data);

  return arrayData;

} 

const Tasks = () => {

  const [tasksData, setTasksData] = useState(() => getData());

  // run on screen load
  const isFocused = useIsFocused();
  
  useEffect(() => {
    setTasksData(getData());
    // console.log(tasksData);
    
  }, [isFocused]);

  return ( 
    <View style={styles.container}>
      <Text>Number of Tasks:</Text>

      <TouchableOpacity onPress={() => getData()}>
        <Text>Button</Text>
      </TouchableOpacity>

      

      {Array.isArray(tasksData) ? 
        tasksData.map((task) => (
          // <Text>ffff</Text>
          <Text>{task.title}</Text>
        )) : <Text>Not an array: {typeof(tasksData)}</Text>
      }

      

    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'red',
  },

});

export default Tasks;