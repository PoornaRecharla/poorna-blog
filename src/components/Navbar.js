import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, logout } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import './Navbar.css'
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';



const Navbar = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState("")

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    const [menutoggle, setMenutoggle] = useState(false)

    const Toggle = () => {
        setMenutoggle(!menutoggle)
    }

    const closeMenu = () => {
        setMenutoggle(false)
    }



    return (
        <div className="header">
            <div className="logo-nav">
                <Link to="/" className='left-logo' onClick={() => { closeMenu() }}>Poorna's Blog</Link>
                <div className='right-navigations'>
                    <div className={menutoggle ? "nav-options active" : "nav-options"}>
                        <Link to='/create' onClick={() => { closeMenu() }}>Create Post</Link>
                        {
                            user ?
                                <>
                                    <Link to={'/profile/' + user.uid} onClick={() => { closeMenu() }}>Profile</Link>
                                    <Link to='/update-profile' onClick={() => { closeMenu() }}>Update Profile</Link>
                                    <Link to='/' onClick={() => { closeMenu(); logout() }}>Logout</Link>
                                </>

                                :
                                <>
                                    <Link to='/login' onClick={() => { closeMenu() }}>Login</Link>
                                    <Link to='/signup' onClick={() => { closeMenu() }}>Signup</Link>
                                </>
                        }
                    </div>
                </div>
            </div>
            <div className="mobile-nav">
                <div className='mobile-menu'>
                    <div onClick={() => { Toggle() }}>
                        {menutoggle ? (
                            <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
                        ) : (
                            <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
                        )}
                    </div>
                </div>
            </div>
        </div>














        // <nav className="navbar">
        //     <h1>Poorna's Blog</h1>
        //     <div className="links">
        //         <Link to="/">Home</Link>
        //         <Link to="/create">Create Post</Link>
        //         {user ?
        //             <>
        //                 <Link to={"/profile/" + user.uid}> Profile </Link>
        //                 <button onClick={() => {
        //                     logout()
        //                     navigate("/")
        //                 }}>
        //                     Logout
        //                 </button>
        //             </> :
        //             <>
        //                 <button className="openModalBtn"
        //                     onClick={() => {
        //                         navigate('/login')
        //                     }}
        //                 >
        //                     Login
        //                 </button>
        //                 <button className="openModalBtn"
        //                     onClick={() => {
        //                         navigate('/signup')
        //                     }}
        //                 >
        //                     Signup
        //                 </button>
        //             </>
        //         }
        //     </div>
        // </nav>
    );
}

export default Navbar;