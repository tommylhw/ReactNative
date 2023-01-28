import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

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
  onValue(ref(database, 'tasks'), (snapshot) => {
    data = snapshot.val();
    console.log('number of tasks: ' + Object.keys(data).length);
  });

  return data;

}

const Tasks = () => {

  const [tasksData, setTasksData] = useState(getData());

  /* const getData = () => {

    onValue(ref(database, 'tasks'), (snapshot) => {
      setTasksData(snapshot.val());
      console.log(tasksData);
      console.log('number of tasks: ' + Object.keys(tasksData).length);
    })

  } */

  return ( 
    <View style={styles.container}>
      <Text>Number of Tasks</Text>

      <TouchableOpacity onPress={() => getData()}>
        <Text>Button</Text>
      </TouchableOpacity>

      <Text>
        {tasksData.toString()}
      </Text>

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