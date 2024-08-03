import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import plus from '../../../images/icon/plus.svg';
import ItemOptions from '../../itemOptions/ItemsOptions';

const Sliders = ({ title, items = [], type }) => {
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const sliderContainerRef = useRef(null);

    const handleItemClick = (itemId) => {
        navigate(`/${type}/${itemId}`);
    };

    const toggleDropdown = (itemId) => {
        setActiveDropdown(activeDropdown === itemId ? null : itemId); //lors du click sur le bouton ellipse, le menu déroulant s'affiche et reste ouvert tant que le bouton n'a pas été recliqué. 
    };

    const handleSeeMore = () => {
        navigate(`/${type}`); //lors du click sur le bouton "+", on accède à la page "détail" qui va afficher tous les films/séries en fonction du genre
    };

    const handleWheel = (e) => {
        if (sliderContainerRef.current) {
            const container = sliderContainerRef.current;
            const scrollAmount = e.deltaY;
             
            container.scrollTo({   //cette partie va permettre de ralentir le défilement - avec le smooth
                left: container.scrollLeft + scrollAmount,
                behavior: 'smooth' 
            });
            
            if (
                (container.scrollLeft === 0 && scrollAmount < 0) ||
                (container.scrollLeft + container.clientWidth === container.scrollWidth && scrollAmount > 0)
            ) {
                return; // Permet le défilement vertical de la page si on est au début ou à la fin du casting
            }
            
            e.preventDefault();
        }
    };

    useEffect(() => { //ceci est l'effet qui va appeler la constante pour aller chercher le moment où l'utiliseur va scroller avec sa souris sur le composant du slider
        const sliderContainer = sliderContainerRef.current;
        if (sliderContainer) {
            sliderContainer.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => {
            if (sliderContainer) {
                sliderContainer.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    // Limiter à 20 éléments (si plus de 20, on pourra appuyer sur le bouton "+")
    const displayedItems = items.slice(0, 20);

    return (
        <div className={s.slider}>
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
                                className={s.itemCard}  //je mets l'image du poster directement en style dans le HTML pour pouvoir créer une boîte dans laquelle la positionner. Puisque c'est un appel d'API, je ne peux pas mettre les images en background image dans mon CSS
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
                    {items.length > 20 && (
                        <div className={s.seeMoreItem}>
                            <button className={s.seeMoreButton} onClick={handleSeeMore}>
                                <img src={plus} alt="Voir plus" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sliders;