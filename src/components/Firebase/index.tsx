import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDoc, getFirestore } from 'firebase/firestore'
const firebase= {
    apiKey: "AIzaSyBbDBOcWiol8B_loVkVbsuOeEEbRT-pWqI",
    authDomain: "systemaposta-1e7b2.firebaseapp.com",
    projectId: "systemaposta-1e7b2",
    storageBucket: "systemaposta-1e7b2.appspot.com",
    messagingSenderId: "565218537883",
    appId: "1:565218537883:web:8226c63e2359432481713e",
    measurementId: "G-XG0FRR65YH"
};

export const app = initializeApp(firebase);
export const database = getFirestore(app)
export const auth = getAuth(app);