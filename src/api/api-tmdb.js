import { setCache, getCache } from '../utils/cache.js';

const API_KEY = '26ea4fd02b2f408aa82a007499337145';
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'fr-FR';

const endpoints = {
    discover: (type, page) => `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}&sort_by=popularity.desc`,
    popular: (type, page) => `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`,
    trending: (type) => `${BASE_URL}/trending/${type}/week?api_key=${API_KEY}&language=${LANGUAGE}`,
    details: (type, id) => `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=${LANGUAGE}`,
    genres: (type) => `${BASE_URL}/genre/${type}/list?api_key=${API_KEY}&language=${LANGUAGE}`,
    byGenre: (type, genreId, page) => `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=${LANGUAGE}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`,
    topRated: (type, page) => `${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`,
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

        if (!data.results && !data.genres && !data.id) {
            throw new Error('Données invalides reçues de l\'API');
        }

        setCache(cacheKey, data);
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        throw error;
    }
};

const getAllItems = async (type) => {
    const allItems = [];
    let page = 1;
    const maxPages = 500;

    try {
        while (page <= maxPages) {
            const url = endpoints.discover(type, page);
            const data = await fetchData(url, `all${type}_page_${page}`);
            allItems.push(...data.results);

            if (page >= data.total_pages) break;
            page++;
        }
        return allItems;
    } catch (error) {
        console.error(`Erreur lors de la récupération de tous les ${type}:`, error);
        throw error;
    }
};

export const getAllMovies = () => getAllItems('movie');
export const getAllTVShows = () => getAllItems('tv');

export const getPopular = async (type, page = 1) => {
    const url = endpoints.popular(type, page);
    return fetchData(url, `popular${type}_${page}`);
};

export const getTrending = async (type) => {
    const url = endpoints.trending(type);
    return fetchData(url, `trending${type}`);
};

export const getDetails = async (type, id) => {
    const url = endpoints.details(type, id);
    return fetchData(url, `${type}Details_${id}`);
};

export const getGenres = async (type) => {
    const url = endpoints.genres(type);
    return fetchData(url, `${type}Genres`);
};

export const getByGenre = async (type, genreId, page = 1) => {
    const url = endpoints.byGenre(type, genreId, page);
    return fetchData(url, `${type}ByGenre_${genreId}_${page}`);
};

export const getTopRated = async (type, page = 1) => {
    const url = endpoints.topRated(type, page);
    return fetchData(url, `topRated${type}_${page}`);
};

export const getDiscover = async (type, page = 1) => {
    const url = endpoints.discover(type, page);
    return fetchData(url, `discover${type}_${page}`);
};

