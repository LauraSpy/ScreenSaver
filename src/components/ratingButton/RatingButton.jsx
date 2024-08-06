import React, { useState } from 'react';
import s from './styles.module.css';

const RatingButton = ({ rating }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation(); // Empêche le clic de se propager à l'élément parent
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`${s.ratingButton} ${isFlipped ? s.flipped : ''}`} onClick={handleClick}>
      <div className={s.front}>
        <i className="far fa-star"></i>
      </div>
      <div className={s.back}>
        {rating ? rating.toFixed(1) : 'N/A'}
      </div>
    </div>
  );
};

export default RatingButton;
