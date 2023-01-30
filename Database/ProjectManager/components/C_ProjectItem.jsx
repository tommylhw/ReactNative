import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CustomColors from '../themes/CustomColors';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const C_ProjectItem = (props) => {
  return ( 
    <View style={styles.container}>
      <TouchableOpacity style={styles.projectCompleteBox}>
        <Entypo name='circle' size={15} color='#fff' style={{fontWeight: 'bold'}} />
      </TouchableOpacity>

      <View style={styles.projectDetails}>
        <Text style={styles.projectNameText}>{props.projectName}</Text>
        <Text>{props.numberOfTasks} tasks to do</Text>
      </View>

      <TouchableOpacity style={styles.projectDelectIcon}>
        <Feather name='trash-2' size={24} color={CustomColors.Primary} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    backgroundColor: '#fff',
    marginVertical: 5,
    height: 60,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  projectCompleteBox: {
    width: 60,
    backgroundColor: CustomColors.Grey,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  projectDetails: {
    borderWidth: 2,
    justifyContent: 'center',
    padding: 10,
    flexGrow: 1,
  },

  projectDelectIcon: {
    width: 60,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  projectNameText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: CustomColors.Black,
  },

});

export default C_ProjectItem;