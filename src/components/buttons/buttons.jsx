import React from 'react';
import s from './styles.module.css';
import play from '../../images/icon/play.svg'; // Assurez-vous que le chemin est correct

export const TrailerButton = ({ trailerKey }) => {
  return (
    <a 
      href={`https://www.youtube.com/watch?v=${trailerKey}`}
      target="_blank"
      rel="noopener noreferrer"
      className={s.trailerButton}
    >
      <div className={s.playIconWrapper}>
        <img src={play} alt="play bouton" className={s.playIcon} />
      </div>
      <span className={s.buttonText}>Bande-annonce</span>
    </a>
  );
};
