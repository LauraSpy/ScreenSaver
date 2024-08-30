import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import arrowDown from '../../images/buttons/bottom.svg';

const NavBar = ({ isOverlay = false, closeMenuOverlay }) => {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const navigate = useNavigate();

    const toggleDropdown = (menu) => {
        if (isOverlay) {
            setDropdownOpen(prevState => prevState === menu ? null : menu);
        }
    };

    const handleMouseEnter = (menu) => {
        if (!isOverlay) {
            setDropdownOpen(menu);
        }
    };

    const handleMouseLeave = () => {
        if (!isOverlay) {
            setDropdownOpen(null);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
        if (isOverlay && closeMenuOverlay) {
            closeMenuOverlay();
        }
    };

    const renderMenu = (menuName, items) => (
        <li
            onMouseEnter={() => handleMouseEnter(menuName)}
            onMouseLeave={handleMouseLeave}
            onClick={() => toggleDropdown(menuName)}
        >
            <button>
                {menuName} <img src={arrowDown} alt="arrow down" style={{ width: '12px', height: '12px', marginLeft:'15%' }} />
            </button>
            {dropdownOpen === menuName && (
                <ul className={s.dropdown}>
                    {items.map((item, index) => (
                        <li key={index} onClick={() => handleNavigation(item.path)}>{item.label}</li>
                    ))}
                </ul>
            )}
        </li>
    );

    const menuItems = {
        Films: [
            { label: 'Films populaires', path: '/list/films/popular' },
            { label: 'Films les mieux notés', path: '/list/films/top-rated' },
            { label: 'Films à l\'affiche', path: '/list/films/now-playing' },
            { label: 'Films à voir', path: '/list/films/to-watch' },
            { label: 'Films déjà vus', path: '/list/films/already-watched' }
        ],
        Séries: [
            { label: 'Séries du moment', path: '/list/series/current' },
            { label: 'Séries populaires', path: '/list/series/popular' },
            { label: 'Séries les mieux notées', path: '/list/series/top-rated' },
            { label: 'Séries à voir', path: '/list/series/to-watch' },
            { label: 'Séries déjà vues', path: '/list/series/already-watched' }
        ],
        'Mes listes': [
            { label: 'Mes Favoris', path: '/my-list' }
        ]
    };

    return (
        <nav className={isOverlay ? s.navOverlay : ''}>
            <ul className={`${s.navLinks} ${isOverlay ? s.navLinksOverlay : ''}`}>
                {Object.entries(menuItems).map(([menuName, items]) => renderMenu(menuName, items))}
            </ul>
        </nav>
    );
}

export default NavBar;