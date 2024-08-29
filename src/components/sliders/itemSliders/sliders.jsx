import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import ItemOptions from '../../itemOptions/ItemsOptions';
import RatingButton from '../../ratingButton/RatingButton';
import { getGenres, getByGenre } from '../../../api/api-tmdb';
import notAvailable from '../../../images/imagesGénériques/notAvailable.png';

// Composant Sliders pour afficher une liste de médias (films ou séries) avec options de filtrage par genre
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
    }, [selectedGenre, type]);

    // Navigation vers la page de détails du média
    const handleItemClick = (itemId) => {
        navigate(`/detail/${type}/${itemId}`);
        // const url = 
        // ouvre dans un nouvel onglet
        // window.open(url, '_blank');
    };

    // Gestion de l'ouverture/fermeture du menu déroulant pour chaque item
    const toggleDropdown = (itemId) => {
        setActiveDropdown(activeDropdown === itemId ? null : itemId);
    };

    // Gestion du défilement horizontal/vertical du slider
    const handleWheel = (e) => {
        if (sliderContainerRef.current) {
            const container = sliderContainerRef.current;
            const isHorizontalScroll = !isListView;

            if (isHorizontalScroll) {
                // Logique pour le défilement horizontal
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
                            <div key={item.id} className={s.sliderItem}>
                                {/* Composant ItemOptions pour afficher le menu déroulant en ellipse */}
                                <ItemOptions
                                    itemId={item.id}
                                    onViewDetails={handleItemClick}
                                />
                                <div
                                    className={s.itemCard}
                                    // ajout de l'affiche en style-inline pour pouvoir modifier la taille
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
                                    {/* Composant RatingButton pour afficher la note globale du média */}
                                    <RatingButton rating={item.vote_average} size={isListView ? 'small' : 'normal'} />
                                </div>
                                <div className={s.itemCardBody}>
                                    <h2 className={s.itemCardBodyTitle}>{item.title || item.name}</h2> 
                                    {/* en fonction de si on est dans film ou série, l'appel du "nom" n'est pas tout à fait pareil */}
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