import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDTETlCetLThB_xkGSi-cPzctRqZGG_G2E",
  authDomain: "shopsavvy1-470e8.firebaseapp.com",
  projectId: "shopsavvy1-470e8",
  storageBucket: "shopsavvy1-470e8.appspot.com",
  messagingSenderId: "8106289071",
  appId: "1:8106289071:web:161f3664d9ff673512b15a",
  measurementId: "G-Y0GXMF37CK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db ,'expenses');
export const getCurrentUser = () => {
  const user = auth.currentUser;
  return user;
};
export default app;