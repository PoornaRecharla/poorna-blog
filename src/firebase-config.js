import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC-fciBcOa-vhyNtJJzNvzjG_Y00eQo2uQ",
    authDomain: "poorna-blog.firebaseapp.com",
    projectId: "poorna-blog",
    storageBucket: "poorna-blog.appspot.com",
    messagingSenderId: "457031338533",
    appId: "1:457031338533:web:2c8a27ce99c46596f2cdcc",
    databaseURL: "https://poorna-blog-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const db = getFirestore(app);