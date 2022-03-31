import React, { useState } from "react"

import { onAuthStateChanged } from "firebase/auth"
import { auth, signInWithGoogle, signup, login, logout } from "../firebase-config"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {


    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    return (
        <>
            <div className="signup">
                <h2>Sign up</h2>
                <input
                    type="email"
                    placeholder="Email..."
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password..."
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button onClick={() => signup(registerEmail, registerPassword)}>Sign up</button>
            </div>
            <div className="login">
                <h2>Log in</h2>
                <input
                    type="email"
                    placeholder="Email..."
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button onClick={() => login(loginEmail, loginPassword)}>Log in</button>
            </div>
            <h3>User Logged in</h3>
            <p>{JSON.stringify(user?.email)}</p>

            <button onClick={() => logout()}>Log out</button>

            <button class="login-with-google-btn" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
            {/* <h1>{localStorage.getItem("name")}</h1>
            <h1>{localStorage.getItem("email")}</h1>
            <img src={localStorage.getItem("profilePic")} /> */}
            {/* <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
            <div>
                <Link to="/dummy">dummy?</Link>
            </div> */}
        </>
    )
}