import React, { useState } from 'react';
import s from './styles.module.css';

//ajout d'un prop TAILLE pour l'affichage de l'icon sur la page où "listView = true"
const RatingButton = ({ rating, size = 'normal' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation(); // Empêche le clic de se propager à l'élément parent
    setIsFlipped(!isFlipped);
  };

  // je corrige avec cette constante le style-inline de l'icon quand il est retourné, bug d'affichage que je ne réussissais pas à corriger directement dans le CSS avec l'icon de l'étoile
  const iconStyle = size === 'small' ? { fontSize: '0.5em', fontWeight: '200' } : {};

  return (
    <div className={`${s.ratingButton} ${s[size]} ${isFlipped ? s.flipped : ''}`} onClick={handleClick}>
      <div className={s.front}>
        <i className="far fa-star"></i>
      </div>
      <div className={s.back} style={iconStyle}>
        {rating ? rating.toFixed(1) : 'N/A'}
      </div>
    </div>
  );
};

export default RatingButton;
