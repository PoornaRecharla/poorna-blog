import React from 'react'
import './Footer.css'

import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import TelegramIcon from '@material-ui/icons/Telegram';
import EmailIcon from '@material-ui/icons/Email';

function Footer() {
    return (
        <div className='footer'>
            <p className="footer-title">Poorna Chandra Recharla</p>
            <div className="tags">
            </div>
            <div className="footer-social">
                <a href="https://www.linkedin.com/in/poornarecharla/" target={"_blank"} className="footer-icon"><LinkedInIcon/></a>
                {/* <a href="#home" className="footer-icon"><TelegramIcon/></a> */}
                <a href="https://twitter.com/PoornaRecharla" target={"_blank"} className="footer-icon"><TwitterIcon/></a>
                <a href="https://github.com/PoornaRecharla" target={"_blank"} className="footer-icon"><GitHubIcon/></a>
                <a href="mailto: poornarecharla@outlook.com" target={"_blank"} className="footer-icon"><EmailIcon/></a>
            </div>
            <p className='footer-copyright'>&#169; 2020 copyright all right reserved</p>
        </div>
    )
}

export default Footer
