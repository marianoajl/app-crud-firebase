// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-5FmJ9dmMO265q1f9meAtHFwIeF3HLM0",
    authDomain: "fir-23307.firebaseapp.com",
    projectId: "fir-23307",
    storageBucket: "fir-23307.appspot.com",
    messagingSenderId: "630038806929",
    appId: "1:630038806929:web:e17d6e94551d141cfada30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);