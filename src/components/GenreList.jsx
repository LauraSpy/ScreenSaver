import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GenreContext } from '../contexts/GenreContext';

const GenreList = () => {
    const { genres, isLoading, filteredMovies, filterMoviesByGenre } = useContext(GenreContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(null);

    const filteredGenres = genres.filter(genre =>
        genre.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (selectedGenre) {
            filterMoviesByGenre(selectedGenre);
        }
    }, [selectedGenre, filterMoviesByGenre]);

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
    };

    if (isLoading) {
        return <div>Chargement des genres...</div>;
    }

    return (
        <div>
            <h1>Liste des Genres</h1>
            <input
                type="text"
                placeholder="Rechercher un genre..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredGenres.map(genre => (
                    <li key={genre.id}>
                        <button onClick={() => handleGenreClick(genre.id)}>
                            {genre.name}
                        </button>
                        <Link to={`/genre/${genre.id}`}>Voir tous les films</Link>
                    </li>
                ))}
            </ul>
            {selectedGenre && (
                <div>
                    <h2>Films du genre sélectionné</h2>
                    {filteredMovies.length > 0 ? (
                        <ul>
                            {filteredMovies.map(movie => (
                                <li key={movie.id}>
                                    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aucun film trouvé pour ce genre.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default GenreList;