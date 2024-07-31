import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import arrowDown from '../../images/buttons/bottom.svg';

const NavBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const navigate = useNavigate();

    const toggleDropdown = (menu) => {
        setDropdownOpen(dropdownOpen === menu ? null : menu);
    };

    return (
        <nav>
            <ul className={s.navLinks}>
                <li>
                    <button onClick={() => toggleDropdown('films')}>
                        Films <img src={arrowDown} alt="arrow down" />
                    </button>
                    {dropdownOpen === 'films' && (
                        <ul className={s.dropdown}>
                            <li onClick={() => navigate('/films/popular')}>Films populaires</li>
                            <li onClick={() => navigate('/films/top-rated')}>Films les mieux notés</li>
                            <li onClick={() => navigate('/films/now-playing')}>Films à l'affiche</li>
                            <li onClick={() => navigate('/films/to-watch')}>Séries à voir</li>
                            <li onClick={() => navigate('/films/already-watched')}>Séries déjà vues</li>
                        </ul>
                    )}
                </li>
                <li>
                    <button onClick={() => toggleDropdown('series')}>
                        Séries <img src={arrowDown} alt="arrow down" />
                    </button>
                    {dropdownOpen === 'series' && (
                        <ul className={s.dropdown}>
                            <li onClick={() => navigate('/series/current')}>Séries du moment</li>
                            <li onClick={() => navigate('/series/popular')}>Séries populaires</li>
                            <li onClick={() => navigate('/series/top-rated')}>Séries les mieux notées</li>
                            <li onClick={() => navigate('/series/to-watch')}>Séries à voir</li>
                            <li onClick={() => navigate('/series/already-watched')}>Séries déjà vues</li>
                        </ul>
                    )}
                </li>
                <li>
                    <button onClick={() => toggleDropdown('genres')}>
                        Genres <img src={arrowDown} alt="arrow down" />
                    </button>
                    {dropdownOpen === 'genres' && (
                        <ul className={s.dropdown}>
                            <li onClick={() => navigate('/genres/action')}>Action</li>
                            <li onClick={() => navigate('/genres/comedy')}>Comédie</li>
                            <li onClick={() => navigate('/genres/drama')}>Drame</li>
                        </ul>
                    )}
                </li>
                <li>
                    <button onClick={() => toggleDropdown('myList')}>
                        Ma Liste <img src={arrowDown} alt="arrow down" />
                    </button>
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