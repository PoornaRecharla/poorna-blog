import React, { useState } from "react";
import "./popup/popup.css";
import { login, signInWithGoogle } from "../firebase-config"
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    return (
        <div className="login">
            <div className="modalContainer">
                <div className="title">
                    <h1>Login</h1>
                </div>
                <div className="body">
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
                    <button class="login-with-google-btn" onClick={() => {
                        signInWithGoogle()
                        navigate(-1);
                    }}>
                        Sign in with Google
                    </button>
                </div>
                <div className="footer1">
                    <button
                        onClick={() => {
                            navigate(-1);
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            if (loginEmail && loginPassword) {
                                login(loginEmail, loginPassword);
                                navigate(-1);
                            }
                        }}
                        id="loginBtn"
                    >
                        Login
                    </button>
                </div>
                <div>
                    Don't have an account?
                    <button
                        onClick={() => {
                            navigate('/signup');
                        }}
                        id="signupBtn"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;