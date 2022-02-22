import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/css/style.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdR7p2ofm3JMhieNLJ2PP_VxJwgf95fH0",
  authDomain: "unichem-ecommerce.firebaseapp.com",
  databaseURL:
    "https://unichem-ecommerce-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "unichem-ecommerce",
  storageBucket: "unichem-ecommerce.appspot.com",
  messagingSenderId: "425079126476",
  appId: "1:425079126476:web:f8448086b86ae3574b0569",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
