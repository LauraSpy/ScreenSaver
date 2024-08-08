import { setCache, getCache } from '../utils/cache.js';

const API_KEY = '26ea4fd02b2f408aa82a007499337145';
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'fr-FR,en-US';

const endpoints = {
    discover: (type, page) => `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}&sort_by=popularity.desc`,
    popular: (type, page) => `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`,
    nowPlaying: (page) => `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`,
    airingToday: (page) => `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`,
    trending: (type) => `${BASE_URL}/trending/${type}/week?api_key=${API_KEY}&language=${LANGUAGE}`,
    details: (type, id) => `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=${LANGUAGE}`,
    genres: (type) => `${BASE_URL}/genre/${type}/list?api_key=${API_KEY}&language=${LANGUAGE}`,
    byGenre: (type, genreId, page) => `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=${LANGUAGE}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`,
    topRated: (type, page) => `${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`,
    credits: (type, id) => `${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=${LANGUAGE}`,
    images: (type, id) => `${BASE_URL}/${type}/${id}/images?api_key=${API_KEY}`,
    videos: (type, id) => `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=${LANGUAGE}&include_video_language=fr,en`,
    similar: (type, id, page) => `${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`,
    watchProviders: (type, id) => `${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`,
    search: (query, page) => `${BASE_URL}/search/multi?api_key=${API_KEY}&language=${LANGUAGE}&query=${encodeURIComponent(query)}&page=${page}`,
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

export const getVideos = async (type, id) => {
    console.log(`Fetching videos for ${type} with ID: ${id}`);
    const url = endpoints.videos(type, id);
    console.log(`Video URL: ${url}`);
    try {
        const data = await fetchData(url, `${type}Videos_${id}`);
        console.log(`Video data received for ${type} ${id}:`, data);
        if (data.results && data.results.length > 0) {
            console.log(`Number of videos found: ${data.results.length}`);
            const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube' && (video.iso_639_1 === 'fr' || video.iso_639_1 === 'en')) ||
                data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            if (trailer) {
                console.log(`Trailer found: ${trailer.key} (Language: ${trailer.iso_639_1})`);
                return trailer.key;
            } else {
                console.log('No trailer found in the video results');
            }
        } else {
            console.log('No video results found');
        }
        return null;
    } catch (error) {
        console.error(`Error fetching videos for ${type} ${id}:`, error);
        throw error;
    }
};

export const getTrendingWithTrailers = async (type) => {
    try {
        const trendingData = await getTrending(type);
        const trendingItems = trendingData.results || [];
        const itemsWithTrailers = [];

        for (const item of trendingItems) {
            const trailerKey = await getVideos(type, item.id);
            if (trailerKey) {
                itemsWithTrailers.push({
                    ...item,
                    trailerKey
                });
            }
        }

        console.log('Items with trailers:', itemsWithTrailers);
        return itemsWithTrailers;
    } catch (error) {
        console.error(`Error fetching trending items with trailers for ${type}:`, error);
        throw error;
    }
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

export const getCredits = async (type, id) => {
    const url = endpoints.credits(type, id);
    return fetchData(url, `${type}Credits_${id}`);
};

export const getImages = async (type, id) => {
    const url = endpoints.images(type, id);
    return fetchData(url, `${type}Images_${id}`);
};

export const getSimilar = async (type, id, page = 1) => {
    const url = endpoints.similar(type, id, page);
    return fetchData(url, `${type}Similar_${id}_${page}`);
};

export const getWatchProviders = async (type, id) => {
    const url = endpoints.watchProviders(type, id);
    return fetchData(url, `${type}WatchProviders_${id}`);
};

export const getNowPlaying = async (page = 1) => {
    const url = endpoints.nowPlaying(page);
    return fetchData(url, `nowPlaying_${page}`);
};

export const getAiringToday = async (page = 1) => {
    const url = endpoints.airingToday(page);
    return fetchData(url, `airingToday_${page}`);
};

export const searchItems = async (query, page = 1) => {
    const url = endpoints.search(query, page);
    return fetchData(url, `search_${query}_${page}`);
};

