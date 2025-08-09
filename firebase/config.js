import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3uf-uDlCgcInMX7e6XQEt3oFupugPcOk",
  authDomain: "babylon-825a1.firebaseapp.com",
  projectId: "babylon-825a1",
  storageBucket: "babylon-825a1.appspot.com",
  messagingSenderId: "449569154927",
  appId: "1:449569154927:web:23ea8e8dad62af73912a9a"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { auth };
