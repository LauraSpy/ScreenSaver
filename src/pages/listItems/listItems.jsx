import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Sliders from '../../components/sliders/itemSliders/sliders';
import { getPopular, getTopRated, getDiscover, getByGenre, getGenres, searchKeywords, searchMoviesByKeyword } from '../../api/api-tmdb';
import FilterSystem from '../../components/FilterSystem/FilterSystem';
import Pagination from '../../components/Pagination/Pagination';
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
        genres: [],
        keywords: ''
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

            if (activeFilters.keywords) {
                const keywords = await searchKeywords(activeFilters.keywords);
                //on vérifier si un mot-clé a été entré
                if (keywords.length > 0) {
                    //puis c'est vérifié avec l'id correspondant aux mot-clés dans l'API
                    const keywordId = keywords[0].id;
                    //renvoie de la donnée
                    data = await searchMoviesByKeyword(keywordId, page);
                } else {
                    //sinon ça renvoie une page blanche
                    data = { results: [], total_pages: 0 };
                }
            } else if (activeFilters.genres.length > 0) {
                //on vérifie qu'un ou plusieurs boutons de genre a été cliqué
                const genreIds = activeFilters.genres.join(',');
                //on renvoie les données en fonction
                data = await getByGenre(type, genreIds, page);
            } else if (genreName) {
                const genreId = genres[genreName.toLowerCase()];
                //ici c'est pour le déboggage si jamais il n'y a pas de résultat
                if (!genreId) {
                    throw new Error('Genre non reconnu');
                }
                data = await getByGenre(type, genreId, page);
            } else {
                //et ici on affiche les éléments en fonction des appels d'API
                switch (listType) {
                    case 'popular':
                        console.log("Réponse de l'API pour les éléments populaires:", data);
                        data = await getPopular(type, page); //avec ajout des langues pour ne pas avoir de titres proposées dans des langues étrangères
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
            setTotalPages(Math.min(data.total_pages, 500));
        } catch (error) {
            console.error("Erreur lors du chargement des éléments:", error);
        }
        setLoading(false);
    };

    //la fonction pour gérer la pagination
    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage.toString() });
    };

    //et celle pour gérer les nouveaux filtres qui seront pris en compte au clic du "Rechercher"
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleKeywordSearch = (keyword) => {
        console.log("Recherche par mot-clé:", keyword);
        setFilters(prevFilters => ({ ...prevFilters, keywords: keyword }));
        setSearchParams({ page: '1' }); // Réinitialise à la première page
    };

    const getTitle = () => {
        if (genreName) {
            return `Genre: ${genreName.charAt(0).toUpperCase() + genreName.slice(1)}`;
        }
        //ici on vérifie si on est plutôt dans les films ou les séries
        const typeLabel = mediaType === 'films' ? 'Films' : 'Séries';
        switch (listType) {
            // et ici on liste les éléments (avec utilisation du typelabel parce que les deux catégories sont disponibles dans les films et séries)
            case 'popular': return `${typeLabel} populaires`;
            case 'top-rated': return `${typeLabel} les mieux notés`;
            case 'now-playing': return 'Films à l\'affiche';
            case 'current': return 'Séries du moment';
            default: return typeLabel;
        }
    };
    
    return (
        <div className={s.ListItems}>
            <div className={s.filter}>
                {/* appel du composant avec les fonctions pour gérer les filtres */}
                <FilterSystem 
                    onFilterChange={handleFilterChange} 
                    onKeywordSearch={handleKeywordSearch} // Ajout de la prop pour la recherche par mot-clé
                />
            </div>
            <div className={s.container}>
                {loading ? (
                    //j'ajoute "loading" en déboggage, s'il n'y a rien à afficher, cela affichera "chargement"
                        <p>Chargement...</p>
                    ) : (
                        <>
                        {/* on commence par vérifier s'il y a des éléments à afficher avec length */}
                            {items.length > 0 ? (
                                //et on affiche le composant
                                <Sliders 
                                    title={getTitle()}
                                    items={items} 
                                    type={mediaType === 'films' ? 'movie' : 'tv'} 
                                    isListView={true}
                                    showGenreFilter={!!genreName}
                                />
                                ) : (
                                    <p>Aucun élément trouvé.</p>
                                )}
                            <Pagination 
                                currentPage={currentPage} 
                                totalPages={totalPages} 
                                handlePageChange={handlePageChange} 
                            />
                        </>
                    )}
            </div>
        </div>
    );
    };
    
    export default ListItems;