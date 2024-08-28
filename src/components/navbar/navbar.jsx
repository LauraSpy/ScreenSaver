import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import arrowDown from '../../images/buttons/bottom.svg';

// Composant NavBar pour la navigation principale
// isOverlay est utilisé pour le style en mode responsive sur mobile
const NavBar = ({ isOverlay = false, closeMenuOverlay  }) => {
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

    // Pour gérer, au clic d'un lien, la remise à l'état initial du menu burger
    const handleNavigation = (path) => {
        navigate(path);
        // on fait appel au prop 
        if (isOverlay && closeMenuOverlay) {
            closeMenuOverlay();
        }
    };

    return (
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
                    {dropdownOpen === 'films' && (
                        <ul className={s.dropdown}>
                            <li onClick={() => handleNavigation('/list/films/popular')}>Films populaires</li>
                            <li onClick={() => handleNavigation('/list/films/top-rated')}>Films les mieux notés</li>
                            <li onClick={() => handleNavigation('/list/films/now-playing')}>Films à l'affiche</li>
                            <li onClick={() => handleNavigation('/list/films/to-watch')}>Films à voir</li>
                            <li onClick={() => handleNavigation('/list/films/already-watched')}>Films déjà vues</li>
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
                    {dropdownOpen === 'series' && (
                        <ul className={s.dropdown}>
                            <li onClick={() => handleNavigation('/list/series/current')}>Séries du moment</li>
                            <li onClick={() => handleNavigation('/list/series/popular')}>Séries populaires</li>
                            <li onClick={() => handleNavigation('/list/series/top-rated')}>Séries les mieux notées</li>
                            <li onClick={() => handleNavigation('/list/series/to-watch')}>Séries à voir</li>
                            <li onClick={() => handleNavigation('/list/series/already-watched')}>Séries déjà vues</li>
                        </ul>
                    )}
                </li>

                {/* Menu Mes Favoris */}
                <li
                    onMouseEnter={() => handleMouseEnter('myList')}
                    onMouseLeave={handleMouseLeave}
                >
                    <button>
                        Mes listes <img src={arrowDown} alt="arrow down" />
                    </button>
                    {dropdownOpen === 'myList' && (
                        <ul className={s.dropdown}>
                            <li onClick={() => handleNavigation('/my-list')}>Mes Favoris</li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;