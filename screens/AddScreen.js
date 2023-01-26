import React, { Component, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, set, onValue  } from 'firebase/database';  
// import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import uuid from 'react-native-uuid';
import 'react-native-get-random-values';


import { FontAwesome, AntDesign, Fontisto, EvilIcons, Ionicons } from '@expo/vector-icons';
import Color from '../themes/Color';

import CustomDrawerBtn from '../components/CustomDrawerBtn';
import BackBtn from '../components/BackBtn';
import InputField from '../components/InputField';

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

const AddScreen = () => {

  // console.log(uuid.v4());
  const [id, setId] = useState();

  const [title, setTitle] = useState();
  const [details, setDetails] = useState();
  const [category, setCategory] = useState();
  const [cateList, setCateList] = useState([]);

  const [currentTime, setCurrentTime] = useState('');

  const getCurrentTime = () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentTime(
      date + '-' + month + '-' + year + '_' + hours + ':' + min + ':' + sec
    );
  }
    
  // backend
  const saveData = (id, title, details) => {

    getCurrentTime();
    
    try {
      set(ref(database, 'tasks/' + currentTime), {
        _id: id,
        title: title,
        details: details
      });
    } catch (err) {
      console.log(err);
    }

  }

  // Initize the category list
  const initCategory = () => {
    const catePathRef = ref(database, 'category');
    onValue(catePathRef, (snapshot) => {
      const data = snapshot.val();
      setCateList(data);
      console.log(cateList);
    })
  }

  useEffect(() => {
    initCategory();
    getCurrentTime();
  }, []);

  

  return ( 
    <View style={styles.frame}>
      {/* <Text>Add Screen</Text> */}

      {/* header */}
      <View style={styles.drawerBtn}><BackBtn /></View>
      <View style={styles.notiIcon}><Ionicons name="notifications-outline" size={24} color={Color.PrimaryDark} /></View>

      {/* body */}
      <View style={styles.mainBody}>

        <View style={styles.titleSection}>
          <Text style={styles.titleSectionText}>New Task</Text>
        </View>

        <LinearGradient 
          colors={[Color.PrimaryLight, Color.PrimarySemiDark]} 
          locations={[0.2, 0.7]}
          style={styles.addSection}
          start={[0.55, 0.1]}
          end={[0.45, 0.95]}
        >
          <View style={styles.cateSection}>
            <Text style={styles.cateTitle}>Category</Text>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
              mode='dropdown'
            > 
              {
                cateList.map((item, index) => {
                  return (
                    <Picker.Item label={item} value={index} key={index} />
                  )
                })
              }

              
            </Picker>
          </View>

          <View style={styles.dateTimeSection}>
            <View style={styles.dateTimeChild}>
              <Text style={styles.cateTitle}>Date</Text>
            </View>
            
            <View style={styles.dateTimeChild}>
              <Text style={styles.cateTitle}>Time</Text>
            </View>
          </View>

          <View style={styles.typeSection}>
            {/* <Text style={styles.cateTitle}>Category</Text> */}
            <View style={styles.typeChild}>
              <Text style={styles.cateTitle}>Title</Text>
              <InputField 
                placeholder='input the title'
                // onValueChange={title => setTitle(title)}
                onChangeText={(text) => setTitle(text)}
              />
            </View>

            <View style={styles.typeChild}>
              <Text style={styles.cateTitle}>Description</Text>
              <InputField 
                placeholder='input the description' 
                onChangeText={(text) => setDetails(text)}
              />
            </View>
          </View>

          <View style={styles.saveSection}>
            <TouchableOpacity style={styles.saveBtn} onPress={() => {
              setId(uuid.v4());
              setTitle(title);
              setDetails(details);
              // getCurrentTime();
              console.log(id, title, details);

              saveData(id, title, details);
            }}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        

      </View>

      <StatusBar style='auto' />
    </View>
   );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    backgroundColor: '#fff',
  },

  drawerBtn: {
    // borderWidth: 2,
    position: 'absolute',
    top: 30,
    left: 30,
  },

  notiIcon: {
    position: 'absolute',
    top: 30,
    right: 30,
  },

  mainBody: {
    // borderWidth: 21,
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 70,
  },

  titleSection: {
    // borderWidth: 21,
    width: '100%',
    height: '12%',
    justifyContent: 'center',
    paddingLeft: 40,
  },

  titleSectionText: {
    fontSize: 22.5,
    fontWeight: 'bold',
  },

  addSection: {
    // borderWidth: 21,
    borderTopRightRadius: 60,
    borderColor: 'red',
    height: '100%',
    backgroundColor: Color.Primary,
    paddingTop: 10,
    paddingHorizontal: 40,
  },

  cateSection: {
    // borderWidth: 21,
    borderColor: 'green',
    width: '100%',
    height: '15%',
    marginVertical: 10
  },

  cateTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },

  dateTimeSection: {
    // borderWidth: 21,
    borderColor: 'green',
    width: '100%',
    height: '15%',
    marginVertical: 10,
    flexDirection: 'row',
  },

  dateTimeChild: {
    // borderWidth: 21,
    borderColor: 'yellow',
    flex: 1
  },

  typeSection: {
    // borderWidth: 21,
    borderColor: 'green',
    width: '100%',
    height: '30%',
    marginVertical: 30
  },

  typeChild:{
    flex: 1,
  },

  saveSection: {
    // borderWidth: 21,
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveBtn: {
    backgroundColor: Color.Secondary,
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderRadius: 10,
  },

  saveBtnText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },

});

export default AddScreen;