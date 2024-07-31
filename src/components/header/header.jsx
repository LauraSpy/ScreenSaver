import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import logoSite from '../../images/logo/logo.svg';
import logoSearch from '../../images/buttons/bouton-search.svg';
import logoNotif from '../../images/icon/notif.svg';
import avatar from '../../images/avatar/default-avatar.svg';
import NavBar from '../navbar/navbar';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSticky, setIsSticky] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={isSticky ? `${s.header} ${s.sticky}` : s.header}>
            <div className={s.headerContent}>
                <div className={s.logoSite}>
                    <img src={logoSite} alt="logo site" />
                </div>
                <form className={s.searchbar} onSubmit={handleSearchSubmit}>
                    <input 
                        type="search" 
                        name="searchbar" 
                        id="searchbar" 
                        aria-label='Rechercher...'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Rechercher..."
                        className={s.searchbarInput}
                    />
                    <button type="submit">
                        <img src={logoSearch} alt="search logo" />
                    </button>
                </form>
                <div className={s.notif}>
                    <img src={logoNotif} alt="notif logo" />
                </div>
                <div className={s.avatar}>
                    <img src={avatar} alt="avatar" />
                </div>
            </div>
            <NavBar />
        </header>
    );
}

export default Header;