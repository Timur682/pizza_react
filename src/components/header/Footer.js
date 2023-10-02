import React from 'react';
import './footer.css'
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__logo">
                {/* Your logo can go here */}
                <img src="Logo.png" alt="Logo" />
            </div>
            <div className="footer__copyright">
                {/* Copyright notice */}
                &copy; 2023 Your Name or Company. All rights reserved.
            </div>
            <div className="footer__contact">
                {/* Contact information, e.g., email or phone */}
                Contact us: karabanovt@email.com
            </div>
            <div className="footer__social">
                {/* Links to social media (if necessary) */}
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
                <a href="#">Instagram</a>
            </div>
        </footer>
    );
};

export default Footer;
