import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import ellipse from '../../../images/icon/ellipsis.svg';
import plus from '../../../images/icon/plus.svg';
import ItemOptions from '../../../components/itemOptions/ItemsOptions';
import play from '../../../images/icon/play.svg'; 

const TrailerSliders = ({ title, items = [], type }) => {
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

    return (
        <div className={s.slider}>
            <div className={s.sliderTitle}>
                <h1>{title}</h1>
            </div>
            <div className={s.sliderContainer}>    
                <div className={s.sliderMap}>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className={s.sliderItem}
                            >   
                                <ItemOptions 
                                    itemId={item.id}
                                    onViewDetails={handleItemClick}
                                />
                                <div className={s.itemCard}>
                                    {/* ici les images de bande annonce */}
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

export default TrailerSliders;
