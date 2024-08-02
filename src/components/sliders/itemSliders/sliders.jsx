import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import ellipse from '../../../images/icon/ellipsis.svg';
import plus from '../../../images/icon/plus.svg';
import ItemOptions from '../../itemOptions/ItemsOptions';

const Sliders = ({ title, items = [], type, maxItems }) => {
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleItemClick = (itemId) => {
        navigate(`/${type}/${itemId}`);
    };

    const toggleDropdown = (itemId) => {
        setActiveDropdown(activeDropdown === itemId ? null : itemId);
    };

    const handleSeeMore = () => {
        navigate(`/${type}`);
    };

    // Si maxItems est défini, on limite le nombre d'éléments affichés
    const displayedItems = maxItems ? items.slice(0, maxItems) : items;

    return (
        <div className={s.slider}>
            <div className={s.sliderTitle}>
                <h1>{title}</h1>
            </div>
            <div className={s.sliderContainer}>    
                <div className={s.sliderMap}>
                    {displayedItems.length > 0 ? (
                        displayedItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={s.sliderItem}
                            >   
                                <ItemOptions 
                                    itemId={item.id}
                                    onViewDetails={handleItemClick}
                                />
                                <div className={s.itemCard}>
                                    <img 
                                        src={item.poster_path //on pose la question de s'il y a un chemin qui mène vers un "poster", et si oui, il s'affiche
                                            ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                                            : 'chemin/vers/image/par/default.jpg'}
                                        className={`${s.itemCardImg} ${index === displayedItems.length - 1 ? s.lastItemImg : ''}`}
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
                {items.length > 0 && (
                    <button className={s.seeMoreButton} onClick={handleSeeMore}>
                        <img src={plus} alt="" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sliders;
