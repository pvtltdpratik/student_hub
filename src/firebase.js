// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6TPC5XdrTQx1iYo8VKdje99Y5Mx4Ot1w",
  authDomain: "salanika.firebaseapp.com",
  databaseURL: "https://salanika-default-rtdb.firebaseio.com",
  projectId: "salanika",
  storageBucket: "salanika.appspot.com",
  messagingSenderId: "209397203869",
  appId: "1:209397203869:web:b35f066f7fc46786e86574",
  measurementId: "G-74D1GSTNW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;