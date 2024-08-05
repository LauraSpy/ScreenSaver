import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import ItemOptions from '../../itemOptions/ItemsOptions';

const Sliders = ({ title, items = [], type, isListView = false }) => {
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const sliderContainerRef = useRef(null);

    const handleItemClick = (itemId) => {
        navigate(`/detail/${type}/${itemId}`);
    };

    const toggleDropdown = (itemId) => {
        setActiveDropdown(activeDropdown === itemId ? null : itemId);
    };

    const handleWheel = (e) => {
        if (sliderContainerRef.current) {
            const container = sliderContainerRef.current;
            const isHorizontalScroll = !isListView;

            if (isHorizontalScroll) {
                // Défilement horizontal
                if (
                    (container.scrollLeft === 0 && e.deltaY < 0) ||
                    (container.scrollLeft + container.clientWidth === container.scrollWidth && e.deltaY > 0)
                ) {
                    return; // Permet le défilement vertical de la page si on est au début ou à la fin du slider
                }

                e.preventDefault();
                
                const scrollAmount = e.deltaY;
                container.scrollTo({
                    left: container.scrollLeft + scrollAmount,
                    behavior: 'smooth'
                });
            } else {
                // En mode liste, on laisse le comportement par défaut (défilement vertical)
                return;
            }
        }
    };

    useEffect(() => {
        const sliderContainer = sliderContainerRef.current;
        if (sliderContainer) {
            sliderContainer.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => {
            if (sliderContainer) {
                sliderContainer.removeEventListener('wheel', handleWheel);
            }
        };
    }, [isListView]);

    const displayedItems = items.slice(0, 20);

    return (
        <div className={`${s.sliderWrapper} ${isListView ? s.listView : ''}`}>
            <div className={s.sliderTitle}>
                <h1>{title}</h1>
            </div>
            <div className={s.sliderContainer} ref={sliderContainerRef}>
                <div className={s.sliderMap}>
                    {displayedItems.map((item) => (
                        <div key={item.id} className={s.sliderItem}>
                            <ItemOptions
                                itemId={item.id}
                                onViewDetails={handleItemClick}
                            />
                            <div
                                className={s.itemCard}
                                style={{
                                    backgroundImage: `url(${
                                        item.poster_path
                                            ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                                            : 'chemin/vers/image/par/default.jpg'
                                    })`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                            </div>
                            <div className={s.itemCardBody}>
                                <h2 className={s.itemCardBodyTitle}>{item.title || item.name}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sliders;