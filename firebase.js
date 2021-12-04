import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDIBXODO3nvFMXfTX7mOajqdF592r97ors",
    authDomain: "signal-clone-62830.firebaseapp.com",
    projectId: "signal-clone-62830",
    storageBucket: "signal-clone-62830.appspot.com",
    messagingSenderId: "960369074356",
    appId: "1:960369074356:web:0ee9126e096b71b80337e1"
  };

  let app;

  if(firebase?.apps?.length === 0)
  {
   app = firebase.initializeApp(firebaseConfig);

  }
  else
  {
    app = firebase.app();
  }


  const db = app.firestore();
  const auth = firebase.auth();


  export { db, auth}