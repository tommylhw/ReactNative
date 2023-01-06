import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { FontAwesome, AntDesign, Fontisto, EvilIcons, Ionicons } from '@expo/vector-icons';
import Color from '../themes/Color';

import CustomDrawerBtn from '../components/CustomDrawerBtn';
import BackBtn from '../components/BackBtn';

const AddScreen = () => {
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
          locations={[0.2, 0.6]}
          style={styles.addSection}
          start={[0.55, 0.1]}
          end={[0.45, 0.9]}
        >
          <View style={styles.cateSection}>
            <Text style={styles.cateTitle}>Category</Text>
          </View>

          <View style={styles.dateTimeSection}>
            <View>
              <Text></Text>
            </View>
          </View>

          <View style={styles.typeSection}>
            <Text style={styles.cateTitle}>Category</Text>
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
    borderWidth: 2,
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 70,
  },

  titleSection: {
    borderWidth: 2,
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    paddingLeft: 30,
  },

  titleSectionText: {
    fontSize: 22.5,
    fontWeight: 'bold',
  },

  addSection: {
    borderWidth: 2,
    borderTopRightRadius: 60,
    borderColor: 'red',
    height: '100%',
    backgroundColor: Color.Primary,
    paddingTop: 10,
    paddingHorizontal: 40,
  },

  cateSection: {
    borderWidth: 2,
    borderColor: 'green',
    width: '100%',
    height: '18%',
    marginVertical: 10
  },

  cateTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },

  dateTimeSection: {
    borderWidth: 2,
    borderColor: 'green',
    width: '100%',
    height: '18%',
    marginVertical: 10
  },

  typeSection: {
    borderWidth: 2,
    borderColor: 'green',
    width: '100%',
    height: '30%',
    marginVertical: 30
  }

});

export default AddScreen;