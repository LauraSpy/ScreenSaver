import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import ellipse from '../../images/icon/ellipsis.svg';
import DropdownMenu from '../dropdownMenu/dropdownMenu';

const Sliders = ({ title, items = [], type }) => {
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleItemClick = (itemId) => {
        navigate(`/details/${type}/${itemId}`);
    };

    const toggleDropdown = (itemId) => {
        setActiveDropdown(activeDropdown === itemId ? null : itemId);
    };

    return (
        <div className={s.slider}>
            <div className={s.sliderTitle}>
                <h1>{title}</h1>
            </div>
            <div className={s.sliderMap}>
                {items.length > 0 ? (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className={s.sliderItem}
                        >   
                            <button
                                onClick={() => toggleDropdown(item.id)}
                                className={s.ellipseButton}
                            >
                                <img className={s.ellipse} src={ellipse} alt="bouton des détails" />
                            </button>
                            {activeDropdown === item.id && (
                                <DropdownMenu
                                    onClose={() => setActiveDropdown(null)}
                                    onViewDetails={() => handleItemClick(item.id)}
                                />
                            )}
                            <div className={s.itemCard}>
                                <img 
                                    src={item.poster_path
                                        ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                                        : 'chemin/vers/image/par/default.jpg'}
                                    className={s.itemCardImg}
                                    alt={item.title || item.name} 
                                />
                                <div className={s.itemCardBody}>
                                    <h2 className={s.itemCardBodyTitle}>{item.title || item.name}</h2>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun {type === 'movie' ? 'film' : 'série'} disponible.</p>
                )}
            </div>
        </div>
    );
};

export default Sliders;
