import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyIvnX9U3MYBNS6Yh4JmomP0Sy-uzB6ew",
  authDomain: "unichem-ecommerce-project.firebaseapp.com",
  projectId: "unichem-ecommerce-project",
  storageBucket: "unichem-ecommerce-project.appspot.com",
  messagingSenderId: "469171613802",
  appId: "1:469171613802:web:e72847b003c1d6851d1a13",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleauthprovider = new GoogleAuthProvider();
