// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD312LG4wyHABFnMy-7EdsSvuTwVUc1Y8w",
  authDomain: "laundryease-ef19d.firebaseapp.com",
  projectId: "laundryease-ef19d",
  storageBucket: "laundryease-ef19d.appspot.com",
  messagingSenderId: "774601277310",
  appId: "1:774601277310:web:acadedd25d5318151afd2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app)

export {auth,db}