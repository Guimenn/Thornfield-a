// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAwngi3IyB9jiTWroD8D_Yp9VOcCimqlwA",
    authDomain: "thornfield-64f32.firebaseapp.com",
    projectId: "thornfield-64f32",
    storageBucket: "thornfield-64f32.appspot.com",
    messagingSenderId: "82291685668",
    appId: "1:82291685668:web:b251987856900c4b339bb1",
    measurementId: "G-BGFYBGSZ3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

export { app, auth, storage, googleProvider };