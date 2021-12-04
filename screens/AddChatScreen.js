import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import {auth,db} from '../firebase';
const AddChatScreen = ({navigation}) => {

    const [input, setInput] = useState('');

    useLayoutEffect(()=>{
        navigation.setOptions({
            title : 'Add a new chat',
            headerBackTitle : 'Chats',
        });
   },[])

   const createChat = async () =>{
       await db.collection('chats').add({
           chatName : input
       }).then(()=>{
           navigation.goBack();
       }).catch(err => alert(err));
   }

    return (

        <View style ={styles.constainer}>
           
           <Input placeholder ='Enter a chat name' 
                        autoFocus 
                        type = 'text'
                        value = {input}
                        onChangeText = {text => setInput(text)}
                        leftIcon ={
                            <Icon name ='wechat'
                                  type= 'antdesign'
                                  size = {24}
                                  color = 'black' />
                        }/>
            <Button disabled = {!input} title = 'Create new chat' onPress = {createChat}/>

        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({

    constainer : {
       backgroundColor : 'white',
       padding : 30,
       height : '100%',
    }
})
