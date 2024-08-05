import React from 'react';
import s from './styles.module.css';

const ViewingStatusFilter = ({ value, onChange }) => {
  const handleChange = (newStatus) => {
    onChange(newStatus);
  };

  return (
    <div className={s.viewingStatusFilter}>
      <h3>Statut de visionnage</h3>
      <div className={s.options}>
        <button
          className={`${s.option} ${value === 'all' ? s.selected : ''}`}
          onClick={() => handleChange('all')}
        >
          Tous
        </button>
        <button
          className={`${s.option} ${value === 'unseen' ? s.selected : ''}`}
          onClick={() => handleChange('unseen')}
        >
          Jamais vus
        </button>
        <button
          className={`${s.option} ${value === 'seen' ? s.selected : ''}`}
          onClick={() => handleChange('seen')}
        >
          Déjà vus
        </button>
      </div>
    </div>
  );
};

export default ViewingStatusFilter;