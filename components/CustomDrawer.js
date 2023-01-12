import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawer = (props) => {
  return ( 
    <View style={styles.contianer}>

      {/* header */}
      <View style={styles.headerSection}>

      </View>

      {/* Drawer list item */}
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

    </View>
   );
}

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    borderRadius:10,
    backgroundColor: '#fff'
  },

  headerSection: {
    borderWidth: 2,
    flex: 0.3
  },

});

export default CustomDrawer;