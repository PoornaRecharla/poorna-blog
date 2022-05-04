import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';



const Navbar = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState("")


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
                <div className="left-logo">
                    <Link to="/" className='left-logo' onClick={() => { closeMenu() }}>Poorna's Thoughts</Link>
                </div>
                {/* <div className='right-navigations'>
                    <div className={menutoggle ? "nav-options active" : "nav-options"}>
                        <Link to='/create' onClick={() => { closeMenu() }}>Create Post</Link>
                        <Link to={'/about'} onClick={() => { closeMenu() }}>About</Link>
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
                </div> */}
            </div>
        </div>
    );
}

export default Navbar;