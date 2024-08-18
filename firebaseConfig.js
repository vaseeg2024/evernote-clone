// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCE2tBFAr7zxw3vNVevDzc4C14GFurVG-w",
  authDomain: "evernote-clone-8aa53.firebaseapp.com",
  projectId: "evernote-clone-8aa53",
  storageBucket: "evernote-clone-8aa53.appspot.com",
  messagingSenderId: "85807899054",
  appId: "1:85807899054:web:9264c4d9abc0210cf8e83f"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app); 