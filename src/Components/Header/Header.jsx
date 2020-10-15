import React from 'react';
import './Header.scss';
import Logo from '../../Assets/img/logo.svg';

const Header = () => {
    return (
        <div className="header">
            <div className="header__top"></div>
            <div className="header__bottom">
                <img className="header__logo" src={ Logo } alt="logo"></img>
                <span className="header__text">Банк для світу, що змінюється</span>
            </div>
        </div>
    );
};

export default Header;