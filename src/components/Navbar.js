import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, logout } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState("")

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    return (
        <nav className="navbar">
            <h1>Poorna's Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">Create Post</Link>
                {user ?
                    <>
                        <Link to="/profile"> Profile </Link>
                        <button onClick={() => {
                            logout()
                            navigate("/")
                        }}>
                            Logout
                        </button>
                    </> :
                    <>
                        <button className="openModalBtn"
                            onClick={() => {
                                navigate('/login')
                            }}
                        >
                            Login
                        </button>
                        <button className="openModalBtn"
                            onClick={() => {
                                navigate('/signup')
                            }}
                        >
                            Signup
                        </button>
                    </>
                }
            </div>
        </nav>
    );
}

export default Navbar;