import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, 
               Text,
               View,
               ScrollView,
               SafeAreaView,
               TouchableOpacity,
               Button } from 'react-native'

import { ListItem, Avatar } from 'react-native-elements';

import CustomListItem from '../components/CustomListItem'
import {AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { auth,db} from '../firebase';


const HomeScreen = ({navigation}) => {

    const [chats,setChats ] = useState([]);


    useEffect(()=>{
         const unsubscribe = db.collection("chats").onSnapshot(snapshot => 
             setChats(snapshot.docs.map( doc => ({
                 id : doc.id,
                 data : doc.data()
             }))
            )
         )

        
    },[])

    const signOutUser = () =>{
        auth.signOut().then(()=>{
            navigation.replace('Login')
        })
    }

    const enterChat = (id, chatName) =>{
        navigation.navigate("Chat", {
            id : id,
            chatName : chatName,
        })
    }

    useLayoutEffect(()=>{
         navigation.setOptions({
             title : "Signal",
             headerStyle : { backgroundColor : '#fff'},
             headerTitleStyle : { color: 'black'},
             headerTintColor : "black",
             headerLeft : () =>  <View style = {{marginLeft : 20}}>

                <TouchableOpacity onPress = {signOutUser}>
                <Avatar rounded source = {{ uri : auth?.currentUser?.photoURL}}/>
                </TouchableOpacity>
             </View>,

             headerRight : () => 
                 <View style = {styles.hright}>
                     <TouchableOpacity activeOpacity = {0.5}>
                         <AntDesign name = 'camerao' size = {24} color = 'black'/>
                     </TouchableOpacity>

                     <TouchableOpacity activeOpacity = {0.5}
                                       onPress = {() => navigation.navigate('addChat')}
                     >
                         <SimpleLineIcons name = 'pencil' size = {24} color = 'black'/>
                     </TouchableOpacity>
                 </View>
             
         });
    },[navigation]);

    return (
        <SafeAreaView>
            <ScrollView style = {styles.container}>
                {chats.map(({id,data : { chatName }}) => (
                      <CustomListItem id = {id} 
                                      key = {id}
                                      chatName = {chatName}
                                      enterChat = {enterChat}/>
                ))}
            

              {/* <Button title = 'LogOut' onPress = {signOutUser}/> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    hright : {
       flexDirection : 'row',
       justifyContent : 'space-between',
       width : 80,
       marginRight : 20
    },

    container : {
        height : '100%'
    }
})
