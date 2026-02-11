import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC--kMdqf1fIasJa6qFPuj-Jp9h3ydaVj8",
  authDomain: "taksit-app.firebaseapp.com",
  projectId: "taksit-app",
  storageBucket: "taksit-app.firebasestorage.app",
  messagingSenderId: "883078574080",
  appId: "1:883078574080:web:b670f117d5a6fcf6bce8e5"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
