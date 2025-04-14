import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };