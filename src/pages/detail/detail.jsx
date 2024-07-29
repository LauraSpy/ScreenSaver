// src/components/DetailFilm.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getGenres } from '../../api/api-tmdb';
import { GenreContext } from '../../contexts/GenreContext';

const DetailFilm = () => {
    const { genreId } = useParams();
    const genres = useContext(GenreContext);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMovies();
    }, [genreId, currentPage]);

    const fetchMovies = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getGenres(genreId, currentPage);
            if (data && data.results) {
                setMovies(data.results);
                setTotalPages(data.total_pages);
            } else {
                throw new Error("Données invalides reçues de l'API");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des films:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const getGenreName = (id) => {
        const genre = genres.find(genre => genre.id === parseInt(id));
        return genre ? genre.name : 'Genre inconnu';
    };

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <div>
            <h1>Films du genre {getGenreName(genreId)}</h1>
            {movies.length === 0 ? (
                <p>Aucun film trouvé pour ce genre.</p>
            ) : (
                <div className="movie-list">
                    {movies.map(movie => (
                        <div key={movie.id} className="movie-card">
                            {movie.poster_path ? (
                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            ) : (
                                <div>No image available</div>
                            )}
                            <h3>{movie.title}</h3>
                        </div>
                    ))}
                </div>
            )}
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Précédent</button>
                <span>Page {currentPage} sur {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Suivant</button>
            </div>
        </div>
    );
};

export default DetailFilm;