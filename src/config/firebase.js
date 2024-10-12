
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBPzenbelkf0JxNh0zlSGfZBJWZfqy0I7Q",
    authDomain: "fir-basics-aa69a.firebaseapp.com",
    projectId: "fir-basics-aa69a",
    storageBucket: "fir-basics-aa69a.appspot.com",
    messagingSenderId: "836250523169",
    appId: "1:836250523169:web:3553a39249b0abfde5f560",
    measurementId: "G-625YHJTSW5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)