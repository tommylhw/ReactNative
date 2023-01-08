import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import Data from '../data/db.json';


const Test = () => {

  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    setItemData(
      {category: [
        "HKUST",
        "Work",
        "Self"
      ],
      "tasks": [
        {
          "id": 1,
          "title": "Title01",
          "details": "details01",
          "date": "data01",
          "time": "time01",
          "cate": "cate01",
          "reminder": false
        },
        {
          "id": 2,
          "title": "Title02",
          "details": "details02",
          "date": "data02",
          "time": "time02",
          "cate": "cate02",
          "reminder": false
        }
      ]}
    );
  }, []);

  

  return ( 
    <View style={styles.frame}>

      {/* <FlatList 
        data={itemData}
        renderItem={({item}) => <Text>{item.category}</Text>}
      /> */}

      <Text>{itemData.category}</Text>

      <Text>{JSON.stringify(itemData.tasks)}</Text>
      

    </View>
    
   );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Test;