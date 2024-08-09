import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import s from './styles.module.css';
import logoSite from '../../images/logo/logo.svg';
import logoSearch from '../../images/buttons/bouton-search.svg';
import logoNotif from '../../images/icon/notif.svg';
import logoSiteMobile from '../../images/logo/logo_small.svg';
import defaultAvatar from '../../images/avatar/avatar-default.png';
import NavBar from '../navbar/navbar';

const Header = () => {
    const user = useSelector((state) => state.auth.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSticky, setIsSticky] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showMenuOverlay, setShowMenuOverlay] = useState(false);
    const [screenSize, setScreenSize] = useState('desktop');
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
            setShowSearchBar(false);
        }
    };

    const toggleSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    };

    const toggleMenuOverlay = () => {
        console.log('Toggle Menu Overlay:', !showMenuOverlay);
        setShowMenuOverlay(!showMenuOverlay);
    };

    console.log('Screen Size:', screenSize);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 640) {
                setScreenSize('mobile');
            } else if (window.innerWidth <= 1024) {
                setScreenSize('tablet');
            } else {
                setScreenSize('desktop');
            }
            console.log('Resize - New Screen Size:', screenSize);
        };

        const handleScroll = () => {
            setIsSticky(window.scrollY > 30);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={isSticky ? `${s.header} ${s.sticky}` : s.header}>
            <div className={s.headerContent}>
                {screenSize === 'mobile' && (
                    <div className={s.menuBurger} onClick={toggleMenuOverlay}>
                        <i className={`${showMenuOverlay ? 'fas fa-times' : 'fas fa-bars'} ${s.iconLarge}`}></i>
                    </div>                
                )}
                <div className={s.logoSite}>
                    <Link to='/'>
                    {/* ici, on va faire une condition pour changer le logo du site en fonction de l'écran : si mobile, on passe à la version du logo fait pour le mobile */}
                        <img 
                            src={screenSize === 'mobile' ? logoSiteMobile : logoSite} 
                            alt="logo site" 
                        />
                    </Link>
                </div>
                {screenSize === 'desktop' && (
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
                )}
                {screenSize === 'tablet' && (
                    <div className={s.tabletIcons}>
                        <div className={s.searchLogo} onClick={toggleSearchBar}>
                            <img src={logoSearch} alt="search logo" />
                        </div>
                        <div className={s.notif}>
                            <img src={logoNotif} alt="notif logo" />
                        </div>
                    </div>
                )}
                {screenSize === 'desktop' && (
                    <div className={s.notif}>
                        <img src={logoNotif} alt="notif logo" />
                    </div>
                )}
                <div className={s.avatar}>
                    <Link to='/profile'>
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
            {showSearchBar && screenSize === 'tablet' && (
                <div className={s.expandedSearchBar}>
                    <form onSubmit={handleSearchSubmit}>
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
                </div>
            )}
            {screenSize === 'desktop' && <NavBar />}
            {showMenuOverlay && screenSize === 'mobile' && (
                <div className={s.menuOverlay}>
                    <NavBar isOverlay={true} />
                    <div className={s.searchbarOverlay}>
                        <form onSubmit={handleSearchSubmit}>
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
                            {/* <button type="submit" className={s.searchLogo}>
                                <img src={logoSearch} alt="search logo" />
                            </button> */}
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
