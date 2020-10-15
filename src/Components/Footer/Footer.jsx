import React from 'react';
import './Footer.scss';
import Logo from '../../Assets/img/logo.svg';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__delim"></div>
            <div className="footer__main">
                <img src={ Logo } alt="" className="footer__logo"/>
                <span className="footer__copyright">
                    © АТ «УКРСИББАНК», 2020
                </span>
            </div>
        </div>
    );
};

export default Footer;