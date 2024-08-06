import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import ItemOptions from '../../itemOptions/ItemsOptions';
import RatingButton from '../../ratingButton/RatingButton';
import { getGenres, getByGenre } from '../../../api/api-tmdb';

const Sliders = ({ title, items = [], type, isListView = false, showGenreFilter = false, initialGenre = null }) => {
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(initialGenre);
    const [isLoading, setIsLoading] = useState(false);
    const [genreItems, setGenreItems] = useState([]);
    const sliderContainerRef = useRef(null);

    // Fetch genres if showGenreFilter is true
    useEffect(() => {
        if (showGenreFilter) {
            const fetchGenres = async () => {
                const genreData = await getGenres(type);
                setGenres(genreData.genres);
            };
            fetchGenres();
        }
    }, [type, showGenreFilter]);

    // Fetch items by genre when selectedGenre changes
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
                                    <RatingButton rating={item.vote_average} />
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