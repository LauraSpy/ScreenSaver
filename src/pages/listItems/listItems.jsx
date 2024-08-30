import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Sliders from '../../components/sliders/itemSliders/sliders';
import { getPopular, getTopRated, getDiscover, getByGenre, getGenres, searchKeywords, searchMoviesByKeyword } from '../../api/api-tmdb';
import FilterSystem from '../../components/FilterSystem/FilterSystem';
import Pagination from '../../components/Pagination/Pagination';
import s from './styles.module.css';

const ITEMS_PER_PAGE = 50;

const ListItems = () => {
    // Extraction des paramètres de l'URL
    const { mediaType, listType, genreName } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    
    // États pour gérer les données et l'interface utilisateur
    const [items, setItems] = useState([]);
    const [genres, setGenres] = useState({});
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({
        genres: [],
        keywords: ''
    });

    // Récupération de la page courante depuis les paramètres de recherche
    const currentPage = Number(searchParams.get('page') || '1');

    // Chargement initial des genres
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

    // Chargement des items en fonction des paramètres et filtres
    useEffect(() => {
        if (Object.keys(genres).length > 0 || !genreName) {
            loadItems(currentPage, filters);
        }
    }, [mediaType, listType, genreName, currentPage, genres, filters]);

    // Fonction principale pour charger les items
    const loadItems = async (page, activeFilters) => {
        setLoading(true);
        try {
            let data;
            const type = mediaType === 'films' ? 'movie' : 'tv';
    
            // Logique de chargement en fonction des filtres et paramètres
            if (activeFilters.keywords) {
                // Recherche par mots-clés
                const keywords = await searchKeywords(activeFilters.keywords);
                if (keywords.length > 0) {
                    const keywordId = keywords[0].id;
                    data = await searchMoviesByKeyword(keywordId, page);
                } else {
                    data = { results: [], total_pages: 0 };
                }
            } else if (activeFilters.genres.length > 0) {
                // Filtrage par genres sélectionnés
                const genreIds = activeFilters.genres.join(',');
                data = await getByGenre(type, genreIds, page);
            } else if (genreName) {
                // Filtrage par genre spécifié dans l'URL
                const genreId = genres[genreName.toLowerCase()];
                if (!genreId) {
                    throw new Error('Genre non reconnu');
                }
                data = await getByGenre(type, genreId, page);
            } else {
                // Chargement en fonction du type de liste
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
            setTotalPages(Math.min(data.total_pages, 250));
        } catch (error) {
            console.error("Erreur lors du chargement des éléments:", error);
        }
        setLoading(false);
    };

    // Gestion du changement de page
    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage.toString() });
    };

    // Gestion du changement de filtres
    const handleFilterChange = (newFilters) => {
        console.log("Nouveaux filtres:", newFilters);
        setFilters(newFilters);
    };

    // Gestion de la recherche par mot-clé
    const handleKeywordSearch = (keyword) => {
        console.log("Recherche par mot-clé:", keyword);
        setFilters(prevFilters => ({ ...prevFilters, keywords: keyword }));
        setSearchParams({ page: '1' }); // Réinitialise à la première page
    };

    // Fonction pour générer le titre de la liste
    const getTitle = () => {
        if (genreName) { //si le genre existe
            return `Genre: ${genreName.charAt(0).toUpperCase() + genreName.slice(1)}`; //prend le premier caractère du nom du genre et le met en majuscule + ajoute le reste du nom du genre (tous les caractères à partir du deuxième).
        }
        //si le genre n'existe pas, la fonction continue pour afficher en fonction du média ou de son label
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
            {/* Section de filtrage */}
            <div className={s.filter}>
                <FilterSystem 
                    onFilterChange={handleFilterChange} 
                    onKeywordSearch={handleKeywordSearch}
                />
            </div>
    
            <div className={s.container}>
                {/* Affichage conditionnel basé sur l'état de chargement */}
                {loading ? (
                    <p>Chargement...</p>
                ) : (
                    <>
                        {/* Vérification s'il y a des éléments à afficher */}
                        {items.length > 0 ? (
                            // Composant Sliders pour afficher la liste des éléments
                            <Sliders 
                                title={getTitle()} // Titre dynamique généré par la fonction getTitle
                                items={items} 
                                type={mediaType === 'films' ? 'movie' : 'tv'} 
                                isListView={true} // Affichage en mode liste, c'est ce que j'ai défini dans mon sliders pour changer son affichage
                                showGenreFilter={!!genreName} // Afficher le filtre de genre si un genre est spécifié
                            />
                        ) : (
                            // Message affiché si aucun élément n'est trouvé
                            <p>Aucun élément trouvé.</p>
                        )}
    
                        {/* Composant de pagination */}
                        <Pagination 
                            currentPage={currentPage} // Page actuelle
                            totalPages={totalPages} // Nombre total de pages
                            handlePageChange={handlePageChange} // Fonction pour gérer le changement de page
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ListItems;