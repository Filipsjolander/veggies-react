import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyDdEx2bxnFVngM23Lhx2lOi0ctDUZOE-r8",
  authDomain: "veggies-nomio.firebaseapp.com",
  projectId: "veggies-nomio",
  storageBucket: "veggies-nomio.appspot.com",
  messagingSenderId: "1083272427183",
  appId: "1:1083272427183:web:831c66910a426974cb065a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);