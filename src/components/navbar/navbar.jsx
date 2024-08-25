import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import arrowDown from '../../images/buttons/bottom.svg';

// Composant NavBar pour la navigation principale
// isOverlay est utilisé pour le style en mode responsive sur mobile
const NavBar = ({ isOverlay = false }) => {
    // État pour gérer l'ouverture des menus déroulants
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const navigate = useNavigate();

    // Gestion de l'ouverture du menu au survol
    const handleMouseEnter = (menu) => {
        setDropdownOpen(menu);
    };

    // Fermeture du menu lorsque la souris quitte la zone
    const handleMouseLeave = () => {
        setDropdownOpen(null);
    };

    return (
        // Application de la classe overlay si nécessaire (pour le responsive)
        <nav className={isOverlay ? s.navOverlay : ''}>
            <ul className={`${s.navLinks} ${isOverlay ? s.navLinksOverlay : ''}`}>
                {/* Menu Films */}
                <li
                    onMouseEnter={() => handleMouseEnter('films')}
                    onMouseLeave={handleMouseLeave}
                >
                    <button>
                        Films <img src={arrowDown} alt="arrow down" />
                    </button>
                    {/* Sous-menu Films */}
                    {dropdownOpen === 'films' && (
                        <ul className={s.dropdown}>
                            <li onClick={() => navigate('/list/films/popular')}>Films populaires</li>
                            <li onClick={() => navigate('/list/films/top-rated')}>Films les mieux notés</li>
                            <li onClick={() => navigate('/list/films/now-playing')}>Films à l'affiche</li>
                            <li onClick={() => navigate('/list/films/to-watch')}>Films à voir</li>
                            <li onClick={() => navigate('/list/films/already-watched')}>Films déjà vues</li>
                        </ul>
                    )}
                </li>

                {/* Menu Séries */}
                <li 
                    onMouseEnter={() => handleMouseEnter('series')}
                    onMouseLeave={handleMouseLeave}
                >
                    <button>
                        Séries <img src={arrowDown} alt="arrow down" />
                    </button>
                    {/* Sous-menu Séries */}
                    {dropdownOpen === 'series' && (
                        <ul className={s.dropdown}>
                            <li onClick={() => navigate('/list/series/current')}>Séries du moment</li>
                            <li onClick={() => navigate('/list/series/popular')}>Séries populaires</li>
                            <li onClick={() => navigate('/list/series/top-rated')}>Séries les mieux notées</li>
                            <li onClick={() => navigate('/list/series/to-watch')}>Séries à voir</li>
                            <li onClick={() => navigate('/list/series/already-watched')}>Séries déjà vues</li>
                        </ul>
                    )}
                </li>

                {/* Menu Ma Liste */}
                <li
                    onMouseEnter={() => handleMouseEnter('myList')}
                    onMouseLeave={handleMouseLeave}
                >
                    <button>
                        Ma Liste <img src={arrowDown} alt="arrow down" />
                    </button>
                    {/* Sous-menu Ma Liste */}
                    {dropdownOpen === 'myList' && (
                        <ul className={s.dropdown}>
                            <li onClick={() => navigate('/my-list')}>Ma liste</li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;