//add the firebase lib
import firebase from 'firebase';

try {
  // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAszawFKGNUFg5-OTrxh5hGw9YkEOZuVA8",
      authDomain: "vibehive-9a55c.firebaseapp.com",
      databaseURL: "https://vibehive-9a55c.firebaseio.com",
      projectId: "vibehive-9a55c",
      storageBucket: "vibehive-9a55c.appspot.com",
      messagingSenderId: "159539366706"
    };
    firebase.initializeApp(config);
} catch (e) {

}


export var firebaseRef = firebase.database().ref();
//lets exprt a ref for our bucket
export var storageRef  = firebase.storage().ref();
export default firebase;
