import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import { LogBox } from 'react-native';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const globalScreenOptions = {
  //headerStyle : { backgroundColor : '#2C6BED'},
  headerStyle : { backgroundColor : '#2492e9'},
  headerTitleStyle : { color : 'white'},
  headerTintColor : 'white',
}

export default function App() {

  console.log("App executed");
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions = {globalScreenOptions}
                      //  initialRouteName = "Home"
                       >

        <Stack.Screen name = "Login" 
                      component = {LoginScreen}
                      />
        <Stack.Screen name = "Register" 
                      component = {RegisterScreen}
                      />

          <Stack.Screen name = "Home" 
                      component = {HomeScreen}
                      />
           <Stack.Screen name = "addChat" 
                      component = {AddChatScreen}
                      />
             <Stack.Screen name = "Chat" 
                      component = {ChatScreen}
                      />
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
});
