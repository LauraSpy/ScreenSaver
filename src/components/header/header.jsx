import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; //va permettre d'utiliser le sélecteur "user" pour l'avatar
import { useNavigate, Link } from 'react-router-dom';
import s from './styles.module.css';
import logoSite from '../../images/logo/logo.svg';
import logoSearch from '../../images/buttons/bouton-search.svg';
import logoNotif from '../../images/icon/notif.svg';
import defaultAvatar from '../../images/avatar/avatar-default.png';
import NavBar from '../navbar/navbar';

const Header = () => {
    const user = useSelector((state) => state.auth.user); //ici on appelle le "user" pour mettre à jour l'avatar
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
            setIsSticky(window.scrollY > 30);
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
                    <Link to='/'>
                        <img src={logoSite} alt="logo site" />
                    </Link>
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
                    <button type="submit" className={s.searchLogo}>
                        <img src={logoSearch} alt="search logo" />
                    </button>
                </form>
                <div className={s.notif}>
                    <img src={logoNotif} alt="notif logo" />
                </div>
                <div className={s.avatar}>
                    <Link to='/profile'>
                    {/* ici, l'avatar se met à jour en fonction du choix de l'utilisateur pour son avatar sur son profil 
                    Si l'utilisateur n'est pas connecté, on affiche l'image par défault : on vérifier si user = null dans le Redux store avec la condition ternaire*/}
                        <img 
                            src={user ? (user.avatar || defaultAvatar) : defaultAvatar} 
                            alt="avatar"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = defaultAvatar;
                              }}
                        /> 
                    </Link>
                </div>
            </div>
            <NavBar />
        </header>
    );
}

export default Header;