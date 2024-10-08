import { setCache, getCache } from '../utils/cache.js';

// Clés et URL de base pour l'API The Movie Database (TMDb)
const API_KEY = '26ea4fd02b2f408aa82a007499337145';
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'fr-FR,en-US';

// Définition des endpoints pour les différentes requêtes à l'API
const endpoints = {
    // Endpoint pour découvrir des films ou séries en fonction de leur popularité
    discover: (type, page) => `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}&sort_by=popularity.desc`,

    // Endpoint pour obtenir les films ou séries populaires
    popular: (type, page) => `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`,

    // Endpoint pour obtenir les films ou séries tendance de la semaine
    trending: (type) => `${BASE_URL}/trending/${type}/week?api_key=${API_KEY}&language=${LANGUAGE}`,

    // Endpoint pour obtenir les détails d'un film ou d'une série spécifique
    details: (type, id) => `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=${LANGUAGE}`,

    // Endpoint pour obtenir la liste des genres disponibles pour les films ou séries
    genres: (type) => `${BASE_URL}/genre/${type}/list?api_key=${API_KEY}&language=${LANGUAGE}`,

    // Endpoint pour découvrir des films ou séries par genre
    byGenre: (type, genreId, page) => `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=${LANGUAGE}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`,

    // Endpoint pour obtenir les films ou séries les mieux notés
    topRated: (type, page) => `${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`,

    // Endpoint pour obtenir les crédits (cast et crew) d'un film ou d'une série
    credits: (type, id) => `${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=${LANGUAGE}`,

    // Endpoint pour obtenir les images d'un film ou d'une série
    images: (type, id) => `${BASE_URL}/${type}/${id}/images?api_key=${API_KEY}`,

    // Endpoint pour obtenir les vidéos (bandes annonces) d'un film ou d'une série
    videos: (type, id) => `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=${LANGUAGE}&include_video_language=fr,en`,

    // Endpoint pour obtenir des films ou séries similaires à un film ou une série spécifique
    similar: (type, id, page) => `${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`,

    // Endpoint pour obtenir les fournisseurs de visionnage d'un film ou d'une série
    watchProviders: (type, id) => `${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`,

    // Endpoint pour rechercher des films ou séries par requête
    search: (query, page) => `${BASE_URL}/search/multi?api_key=${API_KEY}&language=${LANGUAGE}&query=${encodeURIComponent(query)}&page=${page}`,

    // Endpoint pour rechercher des films et série par mots-clés
    searchKeyword: (query) => `${BASE_URL}/search/keyword?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
    discoverByKeyword: (keywordId, page) => `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_keywords=${keywordId}&page=${page}`,
};


// Fonction pour récupérer les données de l'API avec mise en cache
const fetchData = async (url, cacheKey) => {
    // Vérifie si les données sont déjà en cache
    const cachedData = getCache(cacheKey);
    if (cachedData) return cachedData;

    try {
        // Fait une requête HTTP pour récupérer les données depuis l'API
        const response = await fetch(url);

        // Vérifie si la réponse est correcte
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        // Convertit la réponse en JSON
        const data = await response.json();

        // Vérifie si les données reçues sont valides
        if (!data.results && !data.genres && !data.id) {
            throw new Error('Données invalides reçues de l\'API');
        }

        // Met les données en cache
        setCache(cacheKey, data);
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        throw error;
    }
};

// Fonction pour récupérer les éléments populaires

export const getPopular = async (type, page = 1) => {
    const url = endpoints.popular(type, page);
    return fetchData(url, `popular${type}_${page}`);
};

// Fonction pour récupérer les éléments tendance
export const getTrending = async (type) => {
    const url = endpoints.trending(type);
    return fetchData(url, `trending${type}`);
};

// Fonction pour récupérer les bandes annonces
export const getVideos = async (type, id) => {
    const url = endpoints.videos(type, id);
    try {
        const data = await fetchData(url, `${type}Videos_${id}`);
        if (data.results && data.results.length > 0) {
            // Cherche une bande annonce en français ou en anglais sur YouTube
            const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube' && (video.iso_639_1 === 'fr' || video.iso_639_1 === 'en')) ||
                data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            if (trailer) {
                return trailer.key;
            }
        } else {
            console.log('No video results found');
        }
        return null;
    } catch (error) {
        throw error;
    }
};

// Fonction pour récupérer les éléments tendance avec bandes annonces
export const getTrendingWithTrailers = async (type) => {
    try {
        const trendingData = await getTrending(type);
        const trendingItems = trendingData.results || [];
        const itemsWithTrailers = [];

        // Boucle pour récupérer les bandes annonces pour chaque élément tendance
        for (const item of trendingItems) {
            const trailerKey = await getVideos(type, item.id);
            if (trailerKey) {
                itemsWithTrailers.push({
                    ...item,
                    trailerKey
                });
            }
        }

        return itemsWithTrailers;
    } catch (error) {
        throw error;
    }
};

// Fonction pour récupérer les détails d'un élément (film ou série)
export const getDetails = async (type, id) => {
    const url = endpoints.details(type, id);
    return fetchData(url, `${type}Details_${id}`);
};

// Fonction pour récupérer les genres disponibles
export const getGenres = async (type) => {
    const url = endpoints.genres(type);
    return fetchData(url, `${type}Genres`);
};

// Fonction pour récupérer les éléments par genre
export const getByGenre = async (type, genreId, page = 1) => {
    const url = endpoints.byGenre(type, genreId, page);
    return fetchData(url, `${type}ByGenre_${genreId}_${page}`);
};

// Fonction pour récupérer les éléments les mieux notés
export const getTopRated = async (type, page = 1) => {
    const url = endpoints.topRated(type, page);
    return fetchData(url, `topRated${type}_${page}`);
};

// Fonction pour récupérer les éléments à découvrir
export const getDiscover = async (type, page = 1) => {
    const url = endpoints.discover(type, page);
    return fetchData(url, `discover${type}_${page}`);
};

// Fonction pour récupérer les crédits (cast et crew) d'un élément
export const getCredits = async (type, id) => {
    const url = endpoints.credits(type, id);
    return fetchData(url, `${type}Credits_${id}`);
};

// Fonction pour récupérer les images d'un élément
export const getImages = async (type, id) => {
    const url = endpoints.images(type, id);
    return fetchData(url, `${type}Images_${id}`);
};

// Fonction pour récupérer les éléments similaires
export const getSimilar = async (type, id, page = 1) => {
    const url = endpoints.similar(type, id, page);
    return fetchData(url, `${type}Similar_${id}_${page}`);
};

// Fonction pour récupérer les fournisseurs de visionnage d'un élément
export const getWatchProviders = async (type, id) => {
    const url = endpoints.watchProviders(type, id);
    return fetchData(url, `${type}WatchProviders_${id}`);
};

// Fonction pour rechercher des éléments par requête
export const searchItems = async (query, page = 1) => {
    const url = endpoints.search(query, page);
    return fetchData(url, `search_${query}_${page}`);
};


//fonction pour les recherches par mot-clés
export const searchKeywords = async (query) => {
    const url = endpoints.searchKeyword(query);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erreur réseau lors de la recherche de mots-clés');
    }
    const data = await response.json();
    return data.results;
};


//fonction pour rechercher dans les films par mot-clés
export const searchMoviesByKeyword = async (keywordId, page = 1) => {
    const url = endpoints.discoverByKeyword(keywordId, page);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erreur réseau lors de la recherche de films par mot-clé');
    }
    const data = await response.json();
    return data.results;
};


// Fonction pour récupérer les films favoris
export const getFavoriteMovies = async (accountId, sessionId) => {
    const url = endpoints.favoriteMovies(accountId, sessionId);
    return fetchData(url, `favoriteMovies_${accountId}`);
};

// Fonction pour récupérer les séries favorites
export const getFavoriteTV = async (accountId, sessionId) => {
    const url = endpoints.favoriteTV(accountId, sessionId);
    return fetchData(url, `favoriteTV_${accountId}`);
};

// Fonction pour récupérer les films en liste de suivi
export const getWatchlistMovies = async (accountId, sessionId) => {
    const url = endpoints.watchlistMovies(accountId, sessionId);
    return fetchData(url, `watchlistMovies_${accountId}`);
};

// Fonction pour récupérer les séries en liste de suivi
export const getWatchlistTV = async (accountId, sessionId) => {
    const url = endpoints.watchlistTV(accountId, sessionId);
    return fetchData(url, `watchlistTV_${accountId}`);
};

// Fonction pour récupérer les films notés
export const getRatedMovies = async (accountId, sessionId) => {
    const url = endpoints.ratedMovies(accountId, sessionId);
    return fetchData(url, `ratedMovies_${accountId}`);
};

// Fonction pour récupérer les séries notées
export const getRatedTV = async (accountId, sessionId) => {
    const url = endpoints.ratedTV(accountId, sessionId);
    return fetchData(url, `ratedTV_${accountId}`);
};