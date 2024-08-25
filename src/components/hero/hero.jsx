import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import logoSite from '../../images/logo/logo.svg';
import { getDiscover } from '../../api/api-tmdb';
import s from './styles.module.css';
import ellipse1 from '../../images/bulles/Ellipse4.svg';
import ellipse2 from '../../images/bulles/Ellipse5.svg';
import ellipse3 from '../../images/bulles/doubleEllipse.svg';

const Hero = () => {
    const navigate = useNavigate();
    // État pour stocker les éléments à découvrir (films ou séries)
    const [discoverItems, setDiscoverItems] = useState([]);
    // Index de l'élément actuellement affiché dans le carrousel
    const [currentIndex, setCurrentIndex] = useState(0);
    // Type d'élément affiché (film ou série)
    const [itemType, setItemType] = useState('movie');

    // Références pour l'effet de parallaxe des bulles de fond
    const svg1Ref = useRef(null);
    const svg2Ref = useRef(null);
    const svg3Ref = useRef(null);

    // Effet pour charger les éléments à découvrir
    useEffect(() => {
        const fetchDiscoverItems = async () => {
            try {
                const data = await getDiscover(itemType);
                setDiscoverItems(data.results.slice(0, 5)); 
            } catch (error) {
                console.error(`Erreur lors de la récupération des ${itemType === 'movie' ? 'films' : 'séries'} découverts:`, error);
            }
        };

        fetchDiscoverItems();
    }, [itemType]);

    // Fonctions pour naviguer dans le carrousel
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === discoverItems.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? discoverItems.length - 1 : prevIndex - 1
        );
    };

    // Effet pour le défilement automatique du carrousel
    useEffect(() => {
        const slider = setInterval(nextSlide, 3000);
        return () => clearInterval(slider);
    }, [discoverItems.length]);

    // Fonction pour alterner entre films et séries
    const toggleItemType = () => {
        setItemType(prevType => prevType === 'movie' ? 'tv' : 'movie');
    };

    // Fonction pour naviguer vers la page de détails
    const handleViewDetails = (itemId) => {
        navigate(`/detail/${itemType}/${itemId}`);
    };
    
    return (
        <div className={s.hero}>
            <div className={s.heroHeader}>
                <img src={logoSite} alt="logo site" className={s.logoSite} />
                <h1 className={s.title} data-text="économise tes batteries !">économise tes batteries !</h1>
                <p className={s.subTitle}>Retrouve tes films et séries préférés, notes-les, gardes les en mémoire et surtout, découvre le film ou la série qui fera de ta soirée une SUPER soirée ! </p>
                {/* Images de fond pour l'animation */}
                <div className={s.bubblesBackground}>
                    <img ref={svg1Ref} src={ellipse1} alt="ellipse animé floue" className={s.backgroundSvg1} />
                    <img ref={svg2Ref} src={ellipse2} alt="ellipse animé floue" className={s.backgroundSvg2} />
                    <img ref={svg3Ref} src={ellipse3} alt="double ellipse animées floues" className={s.backgroundSvg3} />
                </div>
            </div>
            <div className={s.discoverCarousel}>
                {discoverItems.map((item, index) => {
                    // Logique pour déterminer la position de chaque élément dans le carrousel
                    let position = s.nextSlide;
                    if (index === currentIndex) {
                        position = s.activeSlide;
                    } else if (
                        index === currentIndex - 1 || 
                        (currentIndex === 0 && index === discoverItems.length - 1)
                    ) {
                        position = s.lastSlide;
                    }
                    return (
                        <div key={item.id} className={`${s.carouselItem} ${position}`}>
                            <img 
                                src={`https://image.tmdb.org/t/p/w780${item.backdrop_path}`}
                                alt={item.title || item.name}
                                className={s.backdropImage}
                            />
                            <h3 className={s.itemTitle}>{item.title || item.name}</h3> 
                            {index === currentIndex && (
                                <button
                                    onClick={() => handleViewDetails(item.id)}
                                    className={s.viewDetailsButton}
                                >
                                    Découvre {itemType === 'movie' ? 'ton film' : 'ta série'} !
                                </button>
                            )}
                        </div>
                    );
                })}
                <button className={s.prevButton} onClick={prevSlide}>&#10094;</button>
                <button className={s.nextButton} onClick={nextSlide}>&#10095;</button>
            </div>
            <button onClick={toggleItemType} className={s.buttonChangeState}>
                Ou préfères-tu {itemType === 'movie' ? 'une série' : 'un film'} pour ce soir ?
            </button>
        </div>
    );
};

export default Hero;