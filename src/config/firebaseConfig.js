

const firebase_api_key = import.meta.env.VITE_FIREBASE_API_KEY;

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: firebase_api_key,
  authDomain: "opendoor-db7d9.firebaseapp.com",
  projectId: "opendoor-db7d9",
  storageBucket: "opendoor-db7d9.appspot.com",
  messagingSenderId: "28724812891",
  appId: "1:28724812891:web:3887245038aa72c7a8f37e",
};

const app = initializeApp(firebaseConfig);

export default app;