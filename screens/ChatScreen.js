import React, { useLayoutEffect, useState }  from 'react'
import { StyleSheet, Text, 
         View,
         TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import {AntDesign, SimpleLineIcons ,Ionicons,FontAwesome} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { auth, db } from '../firebase';
import * as firebase from 'firebase';
import { withTheme } from 'react-native-elements';


const ChatScreen = ({navigation, route}) => {

    const [input, setInput] = useState('');

    const [messages, setMessages] = useState([]);


    const sendChat = () =>{
       Keyboard.dismiss();

       db.collection('chats').doc(route.params.id).collection('messages').add({
           timestamp : firebase.firestore.FieldValue.serverTimestamp(),
           message : input,
           displayName : auth.currentUser.displayName,
           email : auth.currentUser.email,
           photoURL : auth.currentUser.photoURL,

       })

       setInput('');
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title : 'Chat',
            headerTitleAlign : "left",
            headerTitle : () => 
                <View style = {{ flexDirection : 'row', alignItems : 'center'}}>
                    <Avatar rounded
                     source = {{uri : messages[messages.length-1]?.data.photoURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}}/>
                    <Text style = {{
                        color : 'white',
                        fontSize : 20,
                        marginLeft : 20,

                    }}>{route.params.chatName}</Text>
                </View>
            ,
           headerRight : () =>
           <View style = { {flexDirection : 'row',
                            marginRight : 30,
                            width : 80,
                            justifyContent : 'space-between'}}>
               <TouchableOpacity>
                  <FontAwesome name = 'video-camera' size = {24} color = 'white'/>
               </TouchableOpacity>

               <TouchableOpacity>
                  <Ionicons name = 'call' size = {24} color = 'white'/>
               </TouchableOpacity>
           </View>
        });
   },[navigation,messages])


   useLayoutEffect(() => {
       const unsubscribe = db
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot( snapshot => setMessages(
            snapshot.docs.map(doc =>({
            id : doc.id,
            data : doc.data()
        }))
   ));
       return unsubscribe
   }, [route])

    return (
        <SafeAreaView style ={{flex: 1, backgroundColor: 'white'}}>
           

            <KeyboardAvoidingView
                 behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
                 style = {styles.conatiner}
                 keyboardVerticalOffset = {90}
            >

            <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>

            <>
               <ScrollView contentContainerStyle ={{ paddingTop : 25}}>
                   {messages.map( ({id,data}) => 
                       data.email === auth.currentUser.email ? 
                       <View key = {id} style = {styles.receiver}>

                           <Avatar
                           size = {25}
                           rounded
                           source = {{ uri : data.photoURL}}
                           position ='absolute'
                           bottom = {-10}
                           right = {-5}/>
                           <Text style = {styles.receiverText}>
                               {data.message}
                           </Text>

                       </View> :
                       <View key = {id} style = {styles.sender}>

                            <Avatar
                             size = {25}
                             rounded
                             source = {{ uri : data.photoURL}}
                             position ='absolute'
                             bottom = {-10}
                             left = {-5}/>

                           <Text style = {styles.senderText}>
                               {data.message}
                           </Text>
                           <Text style = {styles.senderName}>{data.displayName}</Text>

                       </View>
                   )}
               </ScrollView>       

               <View style = {styles.footer}>
                <TextInput placeholder = 'Signal Message'
                           value = {input}
                           onChangeText = { text => setInput(text)}
                           style = {styles.TextInput}
                           onSubmitEditing = {sendChat}/>

                <TouchableOpacity>
                    <Ionicons name ='send' 
                              size={24} 
                              color = '#2492e9'
                              onPress = {sendChat}/>
                </TouchableOpacity>
               </View>   
            </>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    conatiner : {
         flex : 1
    },

    footer : {
       flexDirection : 'row',
       alignItems : 'center',
       padding : 15
    },

    TextInput : {

        bottom : 0,
        height : 40,
        flex : 1,
        marginRight : 15,
        borderColor : 'transparent',
        backgroundColor : '#ECECEC',
        padding : 10,
        color : 'grey',
        borderRadius : 30

    },

    receiver : {
        marginRight : 15,
        marginBottom : 20,
        borderColor : 'transparent',
        backgroundColor : '#ECECEC',
        alignSelf : 'flex-end',
        padding : 15,
        color : 'grey',
        borderRadius : 20,
        maxWidth : '80%',
        position : 'relative',
        

    },

    sender : {
       
        margin : 15,
        borderColor : 'transparent',
        backgroundColor : '#2492e9',
        alignSelf : 'flex-start',
        padding : 15,
        color : 'grey',
        borderRadius : 20,
        maxWidth : '80%',
        position : 'relative'
    },

    senderText : {

        color : 'white',
        fontWeight : '500',
        marginLeft : 10,
        marginBottom : 15,
    },

    receiverText : {
        color : 'black',
        fontWeight : '500',
        marginRight : 10,
        marginBottom : 5,
    },

    senderName : {
        left : 10,
        paddingRight : 10,
        fontSize : 10,
        color : 'white',
    }
})
