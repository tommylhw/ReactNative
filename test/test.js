import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

const Test = () => {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [tasks, setTasks] = useState({});

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
 }

 const getTasks = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/tommylhw/ReactNative/TodoTracker/data/db.json');
      const json = await response.json();
      setTasks(json.tasks);
      console.log(json.tasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
 }

  useEffect(() => {
    getMovies();
    getTasks();
  }, []);


  

  return ( 
    <View style={styles.frame}>

    
    {isLoading ? <Text>Loading...</Text> : (
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <Text>{item.title}, {item.releaseYear}</Text>
        )}
      />
    )}

    {
      isLoading ? <Text>Loading...</Text> : (
        <FlatList 
          data={tasks}
          keyExtractor={({ id }, index) => id}
          renderItem={({item}) => (
            <Text>{item.title}</Text>
          )}
        />
      )
    }
      

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