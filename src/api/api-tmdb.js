import { setCache, getCache } from '../utils/cache.js';

const API_KEY = '26ea4fd02b2f408aa82a007499337145';
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'fr-FR';

const endpoints = {
    discoverMovies: (page) => `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}&sort_by=popularity.desc`,
    popularMovies: (page) => `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`,
    trendingMovies: () => `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=${LANGUAGE}`,
    movieDetails: (movieId) => `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`,
    genres: () => `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`,
    moviesByGenre: (genreId, page) => `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${LANGUAGE}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`,
    topRatedMovies: (page) => `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`,
    popularTVShows: (page) => `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`,
};

const fetchData = async (url, cacheKey) => {
    const cachedData = getCache(cacheKey);
    if (cachedData) return cachedData;

    try {
        const response = await fetch(url);
        console.log(`Fetching: ${url}`);

        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const data = await response.json();
        console.log(`Data received:`, data);

        if (!data.results && !data.genres) {
            throw new Error('Données invalides reçues de l\'API');
        }

        setCache(cacheKey, data);
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        throw error;
    }
};

export const getAllMovies = async () => {
    const allMovies = [];
    let page = 1;
    const maxPages = 500;

    try {
        while (page <= maxPages) {
            const url = endpoints.discoverMovies(page);
            const data = await fetchData(url, `allMovies_page_${page}`);
            allMovies.push(...data.results);

            if (page >= data.total_pages) break;
            page++;
        }
        return allMovies;
    } catch (error) {
        console.error("Erreur lors de la récupération de tous les films:", error);
        throw error;
    }
};

export const getPopularMovies = async (page = 1) => {
    const url = endpoints.popularMovies(page);
    return fetchData(url, `popularMovies_${page}`);
};

export const getTrendingMovies = async () => {
    const url = endpoints.trendingMovies();
    return fetchData(url, 'trendingMovies');
};

export const getMovieDetails = async (movieId) => {
    const url = endpoints.movieDetails(movieId);
    return fetchData(url, `movieDetails_${movieId}`);
};

export const getGenres = async () => {
    const url = endpoints.genres();
    return fetchData(url, 'genres');
};

export const getMoviesByGenre = async (genreId, page = 1) => {
    const url = endpoints.moviesByGenre(genreId, page);
    return fetchData(url, `moviesByGenre_${genreId}_${page}`);
};

export const getTopRatedMovies = async (page = 1) => {
    const url = endpoints.topRatedMovies(page);
    return fetchData(url, `topRatedMovies_${page}`);
};

export const getPopularTVShows = async (page = 1) => {
    const url = endpoints.popularTVShows(page);
    return fetchData(url, `popularTVShows_${page}`);
};