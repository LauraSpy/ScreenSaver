import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Sliders from '../../components/sliders/itemSliders/sliders';
import GenreSlider from '../../components/sliders/GenreSliders/GenreSliders';
import { getPopular, getTopRated, getDiscover, getByGenre, getGenres } from '../../api/api-tmdb';
import FilterSystem from "../../components/FilterSystem/FilterSystem";
import s from './styles.module.css';

const ITEMS_PER_PAGE = 50;

const ListItems = () => {
    const { mediaType, listType, genreName } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [items, setItems] = useState([]);
    const [genres, setGenres] = useState({});
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({
        genres: []
    });

    const currentPage = Number(searchParams.get('page') || '1');

    useEffect(() => {
        const loadGenres = async () => {
            try {
                const movieGenres = await getGenres('movie');
                const tvGenres = await getGenres('tv');
                const genreMap = {};
                [...movieGenres.genres, ...tvGenres.genres].forEach(genre => {
                    genreMap[genre.name.toLowerCase()] = genre.id;
                });
                setGenres(genreMap);
            } catch (error) {
                console.error("Erreur lors du chargement des genres:", error);
            }
        };
        loadGenres();
    }, []);

    useEffect(() => {
        if (Object.keys(genres).length > 0 || !genreName) {
            loadItems(currentPage, filters);
        }
    }, [mediaType, listType, genreName, currentPage, genres, filters]);

    const loadItems = async (page, activeFilters) => {
        setLoading(true);
        try {
            let data;
            const type = mediaType === 'films' ? 'movie' : 'tv';
            if (activeFilters.genres.length > 0) {
                const genreIds = activeFilters.genres.join(',');
                data = await getByGenre(type, genreIds, page);
            } else if (genreName) {
                const genreId = genres[genreName.toLowerCase()];
                if (!genreId) {
                    throw new Error('Genre non reconnu');
                }
                data = await getByGenre(type, genreId, page);
            } else {
                switch (listType) {
                    case 'popular':
                        data = await getPopular(type, page);
                        break;
                    case 'top-rated':
                        data = await getTopRated(type, page);
                        break;
                    case 'now-playing':
                    case 'current':
                        data = await getDiscover(type, page);
                        break;
                    default:
                        throw new Error('Type de liste non reconnu');
                }
            }
            setItems(data.results.slice(0, ITEMS_PER_PAGE));
            setTotalPages(Math.min(data.total_pages, 1000));
        } catch (error) {
            console.error("Erreur lors du chargement des éléments:", error);
        }
        setLoading(false);
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage.toString() });
    };

    const handleFilterChange = (newFilters) => {
        console.log("Nouveaux filtres:", newFilters);
        setFilters(newFilters);
    };

    const getTitle = () => {
        if (genreName) {
            return `Genre: ${genreName.charAt(0).toUpperCase() + genreName.slice(1)}`;
        }
        const typeLabel = mediaType === 'films' ? 'Films' : 'Séries';
        switch (listType) {
            case 'popular': return `${typeLabel} populaires`;
            case 'top-rated': return `${typeLabel} les mieux notés`;
            case 'now-playing': return 'Films à l\'affiche';
            case 'current': return 'Séries du moment';
            default: return typeLabel;
        }
    };

    return (
        <div className={s.ListItems}>
            <h1>{getTitle()}</h1>
            <div className={s.container}>
                <div className={s.filter}>
                    <FilterSystem onFilterChange={handleFilterChange} />
                </div>
                {loading ? (
                        <p>Chargement...</p>
                    ) : (
                        <>
                            {items.length > 0 ? (
                                genreName ? (
                                    <GenreSlider 
                                        items={items} 
                                        genreName={genreName} 
                                        mediaType={mediaType === 'films' ? 'movie' : 'tv'} 
                                    />
                                ) : (
                                    <Sliders items={items} type={mediaType === 'films' ? 'movie' : 'tv'} />
                                )
                            ) : (
                                <p>Aucun élément trouvé.</p>
                            )}
                            <div className={s.pagination}>
                                <button 
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Précédent
                                </button>
                                <span>Page {currentPage} sur {totalPages}</span>
                                <button 
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Suivant
                                </button>
                            </div>
                        </>
                    )}
            </div>
        </div>
    );
};

export default ListItems;