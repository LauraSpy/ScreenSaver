import React from 'react';
import s from './styles.module.css';

const ViewingStatusFilter = ({ value, onChange }) => {
  const handleChange = (newStatus) => {
    onChange(newStatus);
  };

  return (
    <div className={s.viewingStatusFilter}>
      <h3>Afficher</h3>
      <div className={s.options}>
        <label className={s.toggleOption}>
            <input
              type="checkbox"
              checked={value === 'all'}
              onChange={() => handleChange('all')}
              className={s.toggleCheckbox}
            />
            <span className={s.toggleSlider}> </span>
            <span className={s.toggleLabel}>Tous</span>
          </label>
          <label className={s.toggleOption}>
            <input
              type="checkbox"
              checked={value === 'unseen'}
              onChange={() => handleChange('unseen')}
              className={s.toggleCheckbox}
            />
            <span className={s.toggleSlider}> </span>
            <span className={s.toggleLabel}>Jamais vus</span>
          </label>
          <label className={s.toggleOption}>
            <input
              type="checkbox"
              checked={value === 'seen'}
              onChange={() => handleChange('seen')}
              className={s.toggleCheckbox}
            />
            <span className={s.toggleSlider}> </span>
            <span className={s.toggleLabel}>Déjà vus</span>
          </label>
      </div>
    </div>
  );
};

export default ViewingStatusFilter;