import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyA20cxst1NMq9SZfsfItJxWrMXG9zD9qo4",
  authDomain: "keep-6d73f.firebaseapp.com",
  projectId: "keep-6d73f",
  storageBucket: "keep-6d73f.appspot.com",
  messagingSenderId: "507683531257",
  appId: "1:507683531257:web:a9833dd68b2157e2c27528"
};


//init firebase

firebase.initializeApp(firebaseConfig)

//init services

const projectFireStore = firebase.firestore();
const projectStorage = firebase.storage();

const timeStamp = firebase.firestore.Timestamp

//init firebase auth 

const projectAuth = firebase.auth();


export { projectFireStore , projectAuth , projectStorage , timeStamp}


