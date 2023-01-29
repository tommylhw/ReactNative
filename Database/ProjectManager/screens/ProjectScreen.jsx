import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import CustomColors from '../themes/CustomColors';

const ProjectScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>ProjectScreen</Text>
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
});

export default ProjectScreen;
