import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import {Button, Input,Image} from 'react-native-elements'
import { auth } from '../firebase';


const LoginScreen = ({navigation}) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged( authUser =>{
            if(authUser)
            {
                navigation.replace('Home');
            }
        })

        return unsubscribe;
     },[])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email,password).catch(err => 
            alert(err));
    };

    return (
        <KeyboardAvoidingView behaviour = 'padding' style = {styles.container}>
            <StatusBar style = 'light'/>
            <Image source = { { uri : 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png'
                              } }
                    style = {styles.logo}/>

            <View style = {styles.inputContainer}>

                 <Input placeholder ='Email' 
                        autoFocus 
                        type = 'email'
                        value = {email}
                        onChangeText = {text => setEmail(text)}/>

                 <Input placeholder ='Password' 
                        autoFocus 
                        secureTextEntry 
                        type = 'password'
                        value = {password}
                        onChangeText = {text => setPassword(text)}
                        onSubmitEditing = {signIn}/>
                        

            </View>

            <Button title = 'Login'
                    containerStyle = {styles.button}
                    onPress = {signIn}/>

            <Button title = 'Register'
                    containerStyle = {styles.button}
                    type = 'outline'
                    onPress = {()=> navigation.navigate('Register')}/>
            <View style ={{height: 50}}/>
        </KeyboardAvoidingView>
    );
};



const styles = StyleSheet.create({
    logo : {
        width : 170, 
        height : 170
    },

    inputContainer : {
        width : '80%'
    },

    button : {
      width : '80%',
      marginTop : 10
    },

    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        padding : 10
    }
})

export default LoginScreen;