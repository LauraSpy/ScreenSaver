import React from 'react';
import s from './styles.module.css';

const GenreSlider = ({ items, genreName }) => {
    console.log("GenreSlider props:", { items, genreName });

    return (
        <div className={s.genreSlider}>
            <h2>{genreName}</h2>
            <div className={s.sliderContainer}>
                {items.map(item => (
                    <div key={item.id} className={s.sliderItem}>
                        <img 
                            src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} 
                            alt={item.title || item.name} 
                        />
                        <div className={s.itemInfo}>
                            <h3>{item.title || item.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenreSlider;