import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import logoSite from '../../images/logo/logo.svg';
import logoSearch from '../../images/buttons/bouton-search.svg';
import logoNotif from '../../images/icon/notif.svg';
import avatar from '../../images/avatar/default-avatar.svg'

const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
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
                <ul className=''>
                    <li>Films</li>
                    <li>Séries</li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar;