import React from "react";
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';

const Sliders = ({ title, movies = [] }) => {
    console.log("Movies in Sliders:", movies);
    const navigate = useNavigate();

    const handleMovieClick = (movieId) => {
        navigate(`/movies/${movieId}`);
    };

    return (
        <div className={s.slider}>
            <h1>{title}</h1>
            <div className={s.sliderMap}>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div
                            key={movie.id}
                            className={s.sliderItem}
                            onClick={() => handleMovieClick(movie.id)}
                            style={{cursor: 'pointer'}}
                        >
                            <div className={s.movieCard}>
                                <img 
                                    src={movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                                        : 'chemin/vers/image/par/default.jpg'}
                                    className={s.movieCardImg}
                                    alt={movie.title} 
                                />
                                <div className={s.movieCardBody}>
                                    <h2 className={s.movieCardBodyTitle}>{movie.title}</h2>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun film disponible.</p>
                )}
            </div>
        </div>
    );
};

export default Sliders;
