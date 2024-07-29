import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GenreContext } from '../contexts/GenreContext';

const GenreSearch = () => {
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

    if (isLoading) {
        return <div>Chargement des genres...</div>;
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher un genre..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredGenres.map(genre => (
                    <li key={genre.id}>
                        <button onClick={() => setSelectedGenre(genre.id)}>{genre.name}</button>
                    </li>
                ))}
            </ul>
            {selectedGenre && (
                <div>
                    <h2>Films filtrés par genre</h2>
                    {filteredMovies.map(movie => (
                        <div key={movie.id}>{movie.title}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GenreSearch;