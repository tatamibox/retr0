
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFBYBTl2Mjg2zVZK1eBnZkI680GuQxAwU",
    authDomain: "retr0-904c2.firebaseapp.com",
    projectId: "retr0-904c2",
    storageBucket: "retr0-904c2.appspot.com",
    messagingSenderId: "703330959622",
    appId: "1:703330959622:web:b13cb6142f027930989e87",
    measurementId: "G-0PLQXCTNEM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
