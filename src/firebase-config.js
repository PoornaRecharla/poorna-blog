import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from "firebase/auth";
// import { get, getDatabase, ref, set } from "firebase/database";
import { setDoc, doc, getFirestore } from "@firebase/firestore";
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

// export const database = getDatabase(app);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Login Successful");
            const name = result.user.displayName;
            const email = result.user.email;
            const uid = result.user.uid;
            setDoc(doc(db, 'users', uid), {
                name: name,
                email: email,
                uid: uid,
                photoURL: result.user.photoURL
            })
        })
        .catch((error) => {
            console.log(error);
        });
};


export const signup = async (email, password, name) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Register Successful");
        updateProfile(auth.currentUser, {
            displayName: name
        })
        const uid = user.user.uid;
        setDoc(doc(db, 'users', uid), {
            name: name,
            email: email,
            uid: uid,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/poorna-blog.appspot.com/o/Profile%20Photos%2Fdefault.png?alt=media&token=6f135c72-d24e-4e07-8f5e-ffe186625171'
        })
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
};

export const login = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log("Login Successful");
        // console.log(user)
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
};

export const logout = async () => {
    await signOut(auth);
    console.log("Logout Successful");
    // alert('logout successful')
    window.location.href = "/";
};
