import React from 'react';
import s from './styles.module.css';
import plus from '../../images/icon/plus.svg';
import favorite from '../../images/icon/heart.svg';
import bookmark from '../../images/icon/bookmark.svg';

const DropdownMenu = ({ onClose, onViewDetails }) => {
  return (
    <div className={s.dropdownMenu}>
        <button onClick={() => console.log('Ajouter aux favoris')}>
            <img className={s.icon} src={favorite} alt="favorite" />
            Ajouter aux favoris
        </button>
        <button onClick={() => console.log('A voir')}>
            <img className={s.icon} src={bookmark} alt="bookmark" />
            A voir
        </button>
        <button onClick={onViewDetails}>
            <img className={s.icon} src={plus} alt="add" />
            Voir les détails du film
        </button>
    </div>
  );
};

export default DropdownMenu;
