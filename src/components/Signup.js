import React, { useState } from "react";
import "./popup/popup.css";
import { signup, signInWithGoogle } from "../firebase-config"
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate = useNavigate()

    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupName, setSignupName] = useState("");

    return (
        <div className="signup">
            <div className="modalContainer">
                <div className="title">
                    <h1>Sign up</h1>
                </div>
                <div className="body">
                    <input
                        type="text"
                        placeholder="Display Name..."
                        value={signupName}
                        onChange={(e) => {
                            setSignupName(e.target.value);
                        }}
                    />
                    <input
                        type="email"
                        placeholder="Email..."
                        value={signupEmail}
                        onChange={(e) => {
                            setSignupEmail(e.target.value)
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password..."
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                    />
                    <button class="login-with-google-btn" onClick={() => {
                        signInWithGoogle()
                        navigate(-1);
                    }}>
                        Sign up with Google
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
                            if (signupEmail && signupPassword && signupName) {
                                signup(signupEmail, signupPassword, signupName)
                                navigate(-1);
                            }
                        }}
                        id="loginBtn"
                    >
                        Signup
                    </button>
                </div>
                <div>
                        Already have an account?
                        <button
                            onClick={() => {
                                navigate('/login');
                            }}
                            id="loginBtn"
                        >
                            Login
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default Signup;