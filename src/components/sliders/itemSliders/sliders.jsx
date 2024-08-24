import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import ItemOptions from '../../itemOptions/ItemsOptions';
import RatingButton from '../../ratingButton/RatingButton';
import { getGenres, getByGenre } from '../../../api/api-tmdb';
import notAvailable from '../../../images/imagesGénériques/notAvailable.png';

// Composant Sliders pour afficher une liste d'éléments (films ou séries) avec options de filtrage par genre
const Sliders = ({ title, items = [], type, isListView = false, showGenreFilter = false, initialGenre = null }) => {
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(initialGenre);
    const [isLoading, setIsLoading] = useState(false);
    const [genreItems, setGenreItems] = useState([]);
    const sliderContainerRef = useRef(null);

    // Récupération des genres si le filtre par genre est activé
    useEffect(() => {
        if (showGenreFilter) {
            const fetchGenres = async () => {
                const genreData = await getGenres(type);
                setGenres(genreData.genres);
            };
            fetchGenres();
        }
    }, [type, showGenreFilter]);

    // Récupération des éléments par genre lorsque le genre sélectionné change
    useEffect(() => {
        const fetchGenreItems = async () => {
            if (selectedGenre && showGenreFilter) {
                setIsLoading(true);
                try {
                    const genreItemsData = await getByGenre(type, selectedGenre);
                    setGenreItems(genreItemsData.results);
                } catch (error) {
                    console.error("Erreur lors du chargement des éléments par genre:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchGenreItems();
    }, [selectedGenre, type]); //selectedGenre ici va s'activer

    // Navigation vers la page de détails de l'élément
    const handleItemClick = (itemId) => {
        navigate(`/detail/${type}/${itemId}`); //la page qui a été créé dans mes "routes"
    };

    // Gestion du défilement horizontal/vertical du slider
    const handleWheel = (e) => {
        if (sliderContainerRef.current) {
            const container = sliderContainerRef.current;
            const isHorizontalScroll = !isListView; //ici, j'ai ajouté un prop pour que le scroll du sliders ne soit pas actif sur les pages de recherche

            if (isHorizontalScroll) {
                // Logique pour le défilement horizontal
                // ...
            } else {
                // En mode liste, on laisse le comportement par défaut (défilement vertical)
                return;
            }
        }
    };

    // Ajout/suppression de l'écouteur d'événement pour le défilement
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

    // Sélection des éléments à afficher (filtrés par genre ou non)
    const displayedItems = selectedGenre ? genreItems.slice(0, 20) : items.slice(0, 20);

    return (
        <div className={`${s.sliderWrapper} ${isListView ? s.listView : ''}`}>
            <div className={s.sliderTitle}>
                <h1>{title}</h1>
            </div>
            {isLoading ? (
                <p>Chargement...</p>
            ) : (
                <div className={s.sliderContainer} ref={sliderContainerRef}>
                    <div className={s.sliderMap}>
                        {displayedItems.map((item) => (
                            // Rendu de chaque élément du slider
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
                                                : notAvailable
                                        })`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        width: '250px',
                                        height: '400px',
                                    }}
                                >
                                    <RatingButton rating={item.vote_average} size={isListView ? 'small' : 'normal'} />
                                </div>
                                <div className={s.itemCardBody}>
                                    <h2 className={s.itemCardBodyTitle}>{item.title || item.name}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sliders;