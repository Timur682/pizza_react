import React from 'react';
import './footer.css'
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__logo">
                {/* logo */}
                <img src="./image/logo.avif" alt="Logo" />
            </div>
            <div className="footer__copyright">
                {/* Copyright notice */}
                &copy; 2023 Pizza Company. All rights reserved.
            </div>
            <div className="footer__contact">
                {/* Contact information: email or phone */}
                Contact us: karabanovt@gmail.com 
            </div>
        
        </footer>
    );
};

export default Footer;
