// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwngi3IyB9jiTWroD8D_Yp9VOcCimqlwA",
  authDomain: "thornfield-64f32.firebaseapp.com",
  projectId: "thornfield-64f32",
  storageBucket: "thornfield-64f32.firebasestorage.app",
  messagingSenderId: "82291685668",
  appId: "1:82291685668:web:b251987856900c4b339bb1",
  measurementId: "G-BGFYBGSZ3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Configura o provedor Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Exporta as instâncias de autenticação
export const auth = getAuth(app);
export { googleProvider };