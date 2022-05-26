// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAcQHx7BCrb5bw8vWDOFcQf4WLCe7-0RFU",
	authDomain: "mercari-listing-team14.firebaseapp.com",
	projectId: "mercari-listing-team14",
	storageBucket: "mercari-listing-team14.appspot.com",
	messagingSenderId: "438989186335",
	appId: "1:438989186335:web:1f89d2b6d5329ba6b23c2a",
	measurementId: "G-S9PEGC4TKH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
