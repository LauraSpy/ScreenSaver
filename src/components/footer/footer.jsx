import React from 'react';
import logo from '../../images/logo/logo.svg';
import s from './styles.module.css';

const Footer = () => {
    return (
        <div className={s.Footer}>
            <img src={logo} alt="logo site" />
        </div>
    )
}

export default Footer;