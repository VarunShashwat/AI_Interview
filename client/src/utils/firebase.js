
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
   authDomain: "fir-ce490.firebaseapp.com",
  projectId: "fir-ce490",
  storageBucket: "fir-ce490.firebasestorage.app",
  messagingSenderId: "171052030111",
  appId: "1:171052030111:web:7c0efe323c7ad37877eaaa"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}