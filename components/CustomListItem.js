import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';

const CustomListItem = ({id, chatName, enterChat}) => {


    const [chatMesseges, setChatMesseges ] = useState([]);

    useEffect(() => {
        const unsubscribe = db
         .collection('chats')
         .doc(id)
         .collection('messages')
         .orderBy('timestamp','desc')
         .onSnapshot( snapshot => setChatMesseges(
             snapshot.docs.map(doc => doc.data())
    ));
        return unsubscribe
    })



    return (
        <ListItem key = {id} 
                  bottomDivider
                  onPress = {() => enterChat(id,chatName)}>
            <Avatar rounded
                    source = {{ 
                        uri :  chatMesseges?.[0]?.photoURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}}
            />

            <ListItem.Content>
                <ListItem.Title style = {styles.listTitle}>
                 {chatName}
                </ListItem.Title>

                <ListItem.Subtitle numberOfLines = {1}
                                   ellipsizeMode = 'tail'>
                {chatMesseges?.[0]?.displayName} : {chatMesseges?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({
    listTitle : {
        fontWeight : 'bold',
        
    }
})
