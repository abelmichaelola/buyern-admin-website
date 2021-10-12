import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { Functions, getFunctions } from "firebase/functions";
// import { getMessaging, Messaging } from "firebase/messaging";
import { getAnalytics, Analytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, "cities");
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }
class FirebaseConnect {
  app: FirebaseApp;
  analytics: Analytics;
  firestore: Firestore;
  firebaseAuth: Auth;
  firebaseStorage: FirebaseStorage;
  firebaseFunctions: Functions;
  // firebaseMessaging: Messaging;
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.firestore = getFirestore(this.app);
    this.firebaseAuth = getAuth(this.app);
    this.firebaseStorage = getStorage(this.app);
    this.firebaseFunctions = getFunctions(this.app);
    // this.firebaseMessaging = getMessaging(this.app);
    // signInWithEmailAndPassword(this.firebaseAuth, "email", "password")
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     user.
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });;
  }
}
export default FirebaseConnect;
