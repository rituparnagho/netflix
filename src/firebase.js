import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCGPjpQsy0HHVvDE8_dDafhvanw9Ecg0Ko",
  authDomain: "netflix-clone-914cc.firebaseapp.com",
  projectId: "netflix-clone-914cc",
  storageBucket: "netflix-clone-914cc.appspot.com",
  messagingSenderId: "336917759427",
  appId: "1:336917759427:web:da80e01c5c6f389d492976",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
