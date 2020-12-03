import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Screen, screensEnabled } from 'react-native-screens';
import Turma from './pages/Turma';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './pages/login';
import TimeLine from './pages/Timeline';
import Ranking from './pages/Ranking';

const Stack  = createStackNavigator();
const Drawer = createDrawerNavigator();



const Professor = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="TimeLine" component={TimeLine} />
      <Drawer.Screen name="Logout" component={Logout} />

    </Drawer.Navigator>
  )
}

const Aluno = ({navigation}) => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown : true}} initialRouteName="TimeLine">
      <Drawer.Screen name="TimeLine" component={TimeLine} />
      <Drawer.Screen name="Ranking" component={Ranking} />
      <Drawer.Screen name="Turma" component={Turma} />
      <Drawer.Screen name="Logout" component={Logout} />
      
    </Drawer.Navigator>
  )
}

const Logout = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Deseja realmente sair da aplicação?</Text>
      <TouchableOpacity onPress={() => {
        AsyncStorage.removeItem('token');
        navigation.push('Login');
      }} style={styles.button}>
        <Text style={{color: 'white'}}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Ranking} />
        <Stack.Screen name="Professor" component={Professor} />
        <Stack.Screen name="Aluno" component={Aluno}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3b3b3b',
    width: '50%',
    padding: 10,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
