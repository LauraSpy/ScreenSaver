import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import logoSite from '../../images/logo/logo.svg';
import logoSearch from '../../images/buttons/bouton-search.svg';
import logoNotif from '../../images/icon/notif.svg';
import avatar from '../../images/avatar/default-avatar.svg';
import arrowDown from '../../images/buttons/bottom.svg';

const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(null); // État pour gérer quel menu est ouvert
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

    const toggleDropdown = (menu) => {
        setDropdownOpen(dropdownOpen === menu ? null : menu); // Toggle le menu
    };

    return (
        <header>
            <div className='header'>
                <div className='logoSite'>
                    <img src={logoSite} alt="logo site" />
                </div>
                <form className='searchbar' onSubmit={handleSearchSubmit}>
                    <input 
                        type="search" 
                        name="searchbar" 
                        id="searchbar" 
                        aria-label='Rechercher...'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Rechercher..."
                    />
                    <button type="submit">
                        <img src={logoSearch} alt="search logo" />
                    </button>
                </form>
                <div className='notif'>
                    <img src={logoNotif} alt="notif logo" />
                </div>
                <div className='avatar'>
                    <img src={avatar} alt="avatar" />
                </div>
            </div>
            <nav>
                <ul className='nav-links'>
                    <li>
                        <button onClick={() => toggleDropdown('films')}>
                            Films <img src={arrowDown} alt="arrow down" />
                        </button>
                        {dropdownOpen === 'films' && (
                            <ul className='dropdown'>
                                <li onClick={() => navigate('/films/popular')}>Films populaires</li>
                                <li onClick={() => navigate('/films/top-rated')}>Films les mieux notés</li>
                                <li onClick={() => navigate('/films/now-playing')}>Films à l'affiche</li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button onClick={() => toggleDropdown('series')}>
                            Séries <img src={arrowDown} alt="arrow down" />
                        </button>
                        {dropdownOpen === 'series' && (
                            <ul className='dropdown'>
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
                            <ul className='dropdown'>
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
                            <ul className='dropdown'>
                                <li onClick={() => navigate('/my-list')}>Ma liste</li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar;