import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrgl2eVzEIfM5glGkjZ0FyWnLMjZsbE-s",
  authDomain: "echo-electronics.firebaseapp.com",
  projectId: "echo-electronics",
  storageBucket: "echo-electronics.appspot.com",
  messagingSenderId: "447170163336",
  appId: "1:447170163336:web:f9c5cbcdfd242b1ec8653d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
