import { setCache, getCache } from '../utils/cache.js';

const API_KEY = '26ea4fd02b2f408aa82a007499337145';
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'fr-FR';

// Fonction pour récupérer un maximum de films
export const getAllMovies = async () => {
    const allMovies = [];
    let page = 1;
    const maxPages = 500; // TMDB limite généralement à 500 pages

    try {
        while (page <= maxPages) {
            const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}&sort_by=popularity.desc`);
            console.log(`Fetching page ${page}: ${response.url}`);

            if (!response.ok) {
                throw new Error('Erreur réseau');
            }

            const data = await response.json();
            console.log(`Page ${page} data:`, data);

            if (!data.results) {
                throw new Error('Données invalides reçues de l\'API');
            }

            allMovies.push(...data.results);

            if (page >= data.total_pages) break; // Arrêtez si vous avez atteint la dernière page
            page++;
        }

        return allMovies;
    } catch (error) {
        console.error("Erreur lors de la récupération de tous les films:", error);
        throw error;
    }
};

// Fonction pour récupérer les détails d'un film spécifique
export const getMovieDetails = async (movieId) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`);
        console.log(`Fetching movie details for ID ${movieId}: ${response.url}`);

        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const data = await response.json();
        console.log(`Movie details data for ID ${movieId}:`, data);

        if (!data) {
            throw new Error('Données invalides reçues de l\'API');
        }

        return data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des détails du film ${movieId}:`, error);
        throw error;
    }
};

// Fonction pour récupérer les films populaires
export const getPopularMovies = async (page = 1) => {
    const cacheKey = `popularMovies_${page}`;
    const cachedData = getCache(cacheKey);

    if (cachedData) return cachedData;

    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`);
        console.log(`Fetching popular movies page ${page}: ${response.url}`);

        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const data = await response.json();
        console.log(`Popular movies data page ${page}:`, data);

        if (!data.results) {
            throw new Error('Données invalides reçues de l\'API');
        }

        setCache(cacheKey, data);
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des films populaires:", error);
        throw error;
    }
};

// Fonction pour récupérer les films du moment (tendances)
export const getTrendingMovies = async () => {
    const cacheKey = 'trendingMovies';
    const cachedData = getCache(cacheKey);

    if (cachedData) return cachedData;

    try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=${LANGUAGE}`);
        console.log(`Fetching trending movies: ${response.url}`);

        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const data = await response.json();
        console.log(`Trending movies data:`, data);

        if (!data.results) {
            throw new Error('Données invalides reçues de l\'API');
        }

        setCache(cacheKey, data);
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des films tendances:", error);
        throw error;
    }
};

// Fonction pour récupérer les genres de films

export const getGenres = async () => {
    try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`);
        console.log(`Fetching genres: ${response.url}`);

        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const data = await response.json();
        console.log(`Genres data:`, data);

        if (!data.genres) {
            throw new Error('Données invalides reçues de l\'API');
        }

        return data.genres;
    } catch (error) {
        console.error("Erreur lors de la récupération des genres:", error);
        throw error;
    }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
    const cacheKey = `moviesByGenre_${genreId}_${page}`;
    const cachedData = getCache(cacheKey);

    if (cachedData) return cachedData;

    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${LANGUAGE}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`);
        console.log(`Fetching movies for genre ${genreId}, page ${page}: ${response.url}`);

        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const data = await response.json();
        console.log(`Movies data for genre ${genreId}, page ${page}:`, data);

        if (!data.results) {
            throw new Error('Données invalides reçues de l\'API');
        }

        setCache(cacheKey, data);
        return data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des films pour le genre ${genreId}:`, error);
        throw error;
    }
};

// Fonction pour récupérer les films les mieux notés
export const getTopRatedMovies = async (page = 1) => {
    const cacheKey = `topRatedMovies_${page}`;
    const cachedData = getCache(cacheKey);

    if (cachedData) return cachedData;

    try {
        const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`);
        console.log(`Fetching top rated movies page ${page}: ${response.url}`);

        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const data = await response.json();
        console.log(`Top rated movies data page ${page}:`, data);

        if (!data.results) {
            throw new Error('Données invalides reçues de l\'API');
        }

        setCache(cacheKey, data);
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des films les mieux notés:", error);
        throw error;
    }
};

// Fonction pour récupérer les séries populaires
export const getPopularTVShows = async (page = 1) => {
    const cacheKey = `popularTVShows_${page}`;
    const cachedData = getCache(cacheKey);

    if (cachedData) return cachedData;

    try {
        const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`);
        console.log(`Fetching popular TV shows page ${page}: ${response.url}`);

        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const data = await response.json();
        console.log(`Popular TV shows data page ${page}:`, data);

        if (!data.results) {
            throw new Error('Données invalides reçues de l\'API');
        }

        setCache(cacheKey, data);
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des séries populaires:", error);
        throw error;
    }
};