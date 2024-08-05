import React from 'react';
import { Link } from 'react-router-dom';
import s from './styles.module.css';

const GenreSlider = ({ items, genreName, mediaType }) => {
    return (
        <div className={s.genreSlider}>
            <h2>{genreName}</h2>
            <div className={s.sliderContainer}>
                {items.map(item => (
                    <div key={item.id} className={s.sliderItem}>
                        <Link to={`/${mediaType}/${item.id}`}>
                            <img 
                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} 
                                alt={item.title || item.name} 
                            />
                            <div className={s.itemInfo}>
                                <h3>{item.title || item.name}</h3>
                                <p>Note : {item.vote_average}</p>
                                {/* Vous pouvez ajouter d'autres informations spécifiques au genre ici */}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <Link to={`/genres/${genreName.toLowerCase()}`} className={s.seeMoreLink}>
                Voir plus dans {genreName}
            </Link>
        </div>
    );
};

export default GenreSlider;