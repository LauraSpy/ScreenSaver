import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { getGenres } from '../../../api/api-tmdb';

const GenreFilter = ({ selectedGenres, onChange }) => {
  const [availableGenres, setAvailableGenres] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const movieGenres = await getGenres('movie');
        const tvGenres = await getGenres('tv');
        const allGenres = [...movieGenres.genres, ...tvGenres.genres];
        const uniqueGenres = Array.from(new Set(allGenres.map(genre => genre.id)))
          .map(id => {
            return allGenres.find(genre => genre.id === id);
          });
        setAvailableGenres(uniqueGenres);
      } catch (error) {
        console.error("Erreur lors du chargement des genres:", error);
      }
    };
    loadGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    const newSelectedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    onChange(newSelectedGenres);
  };

  return (
    <div className={styles.genreFilter}>
      <h3>Genres</h3>
      <div className={styles.genreButtons}>
        {availableGenres.map(genre => (
          <button
            key={genre.id}
            className={`${styles.genreButton} ${selectedGenres.includes(genre.id) ? styles.selected : ''}`}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;