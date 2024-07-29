import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getGenres, getMoviesByGenre } from '../api/api-tmdb';

export const GenreContext = createContext([]);

export const GenreProvider = ({ children }) => {
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenres();
                setGenres(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des genres:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGenres();
    }, []);

    const filterMoviesByGenre = useCallback(async (genreId) => {
        setIsLoading(true);
        try {
            const movies = await getMoviesByGenre(genreId);
            setFilteredMovies(movies.results);
        } catch (error) {
            console.error("Erreur lors du filtrage des films par genre:", error);
            setFilteredMovies([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <GenreContext.Provider value={{ genres, isLoading, filteredMovies, filterMoviesByGenre }}>
            {children}
        </GenreContext.Provider>
    );
};