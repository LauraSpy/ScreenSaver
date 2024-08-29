import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import s from './styles.module.css';
import logoSite from '../../images/logo/logo.svg';
import logoSearch from '../../images/buttons/bouton-search.svg';
import logoSiteMobile from '../../images/logo/logo_small.svg';
import defaultAvatar from '../../images/avatar/avatar-default.png';
import NavBar from '../navbar/navbar';

const Header = () => {
    // Récupération des informations de l'utilisateur depuis le store Redux
    const user = useSelector((state) => state.auth.user);
    
    // États pour gérer la recherche, le style sticky, le menu overlay et la taille de l'écran
    const [searchTerm, setSearchTerm] = useState('');
    const [isSticky, setIsSticky] = useState(false);
    const [showMenuOverlay, setShowMenuOverlay] = useState(false);
    const [screenSize, setScreenSize] = useState('desktop');
    
    const navigate = useNavigate();

    // Gestion du changement dans la barre de recherche
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Gestion de la soumission de la recherche
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
            if (screenSize === 'mobile') {
                closeMenuOverlay(); // Ferme l'overlay sur mobile après la recherche
            }
        }
    };

    // Basculer l'affichage du menu overlay (pour mobile)
    const toggleMenuOverlay = () => {
        setShowMenuOverlay(!showMenuOverlay);
    };

    // Effet pour gérer le redimensionnement de la fenêtre et le défilement
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 800) {
                setScreenSize('mobile');
            } else if (window.innerWidth <= 1024) {
                setScreenSize('tablet');
            } else {
                setScreenSize('desktop');
            }
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

    const closeMenuOverlay = () => {
        setShowMenuOverlay(false);
    };

    const handleProfileClick = (e) => {
        e.preventDefault();
        navigate('/profile');
        // Utilisation de setTimeout pour s'assurer que la navigation est terminée avant de défiler
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    };

    return (
        <header className={isSticky ? `${s.header} ${s.sticky}` : s.header}>
            <div className={s.headerContent}>
                {/* Affichage du menu burger pour mobile */}
                {screenSize === 'mobile' && (
                    <div className={s.menuBurger} onClick={toggleMenuOverlay}>
                        <i className={`${showMenuOverlay ? 'fas fa-times' : 'fas fa-bars'} ${s.iconLarge}`}></i>
                    </div>                
                )}
                {/* Logo du site */}
                <div className={s.logoSite}>
                    <Link to='/'>
                        <img 
                            src={screenSize === 'mobile' ? logoSiteMobile : logoSite} 
                            alt="logo site" 
                        />
                    </Link>
                </div>
                {/* Barre de recherche pour desktop et tablet */}
                {(screenSize === 'desktop' || screenSize === 'tablet') && (
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
                {/* Avatar de l'utilisateur */}
                <div className={s.avatar}>
                    <Link to='/profile' onClick={handleProfileClick}>
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
            {/* Barre de navigation pour desktop et tablet */}
            {(screenSize === 'desktop' || screenSize === 'tablet') && <NavBar />}
            {/* Menu overlay pour mobile */}
            {showMenuOverlay && screenSize === 'mobile' && (
                <div className={s.menuOverlay}>
                    <NavBar isOverlay={true} closeMenuOverlay={closeMenuOverlay} />
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
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;