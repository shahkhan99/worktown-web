import * as firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAwKfR8gxDwqPkK1HwNvQMoFgMQoK3Cukc",
  authDomain: "worktown-web.firebaseapp.com",
  databaseURL: "https://worktown-web-default-rtdb.firebaseio.com",
  projectId: "worktown-web",
  storageBucket: "worktown-web.appspot.com",
  messagingSenderId: "1026643158772",
  appId: "1:1026643158772:web:612b93173fc91a0ae860a1",
  measurementId: "G-PZB85YRQKH",
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
