import React , { useState , useLayoutEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import {Button, Input,Image,Text} from 'react-native-elements'
import { StyleSheet, View,
         KeyboardAvoidingView } from 'react-native'
import {auth} from '../firebase'

const RegisterScreen = ({navigation}) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [imageUrl,setImageUrl] = useState('');



    useLayoutEffect(()=>{
       navigation.setOptions({
           headerBackTitle : 'Back to Login'
       })
    },[navigation])


    const register = () => {
        auth
            .createUserWithEmailAndPassword(email,password)
            .then( authUser => {
                console.log('User Registered');
                authUser.user.updateProfile({
                    displayName : name,
                    photoURL : imageUrl 
                    || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                }).then( () => console.log('done profile update'))
            })
            .catch( err => alert(err.message));
    }

    return (
        <KeyboardAvoidingView behaviour = 'padding' style={styles.container}>
             <StatusBar style = 'light' />


             <Text h3 style = {styles.title}>
                 Create a Signal Account
             </Text>
             <View style = {styles.inputContainer}>

                 <Input
                      placeholder = 'Full Name'
                      type = 'text'
                      value = {name}
                      autoFocus
                      onChangeText = {text => setName(text)}
                 />

                  <Input
                      placeholder = 'Email'
                      type = 'email'
                      value = {email}
                      autoFocus
                      onChangeText = {text => setEmail(text)}
                 />

                <Input
                      placeholder = 'Password'
                      type = 'password'
                      secureTextEntry
                      value = {password}
                      autoFocus
                      onChangeText = {text => setPassword(text)}
                 />

                  <Input
                      placeholder = 'Profile Picture URL'
                      type = 'text'
                      value = {imageUrl}
                      autoFocus
                      onChangeText = {text => setImageUrl(text)}
                      onSubmitEditing = {register}
                 />

                 
                 <Button raised 
                         title = 'Register' 
                         onPress = {register}
                         style = {styles.button}/>
             </View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({

    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        padding : 10
    },

    inputContainer : {
       width : '80%'
    },

    button : {
        marginTop : 10
    },

    title : {
        marginBottom : 50,
        color : 'black',
        fontWeight : '200'
    }
    
})
