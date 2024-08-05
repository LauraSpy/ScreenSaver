import React, { useState, useEffect } from 'react';
import s from './styles.module.css';

const DurationFilter = ({ value, onChange, maxDurationLimit = 300 }) => {
    const [maxDuration, setMaxDuration] = useState(
        typeof value === 'object' ? value.max : (value || maxDurationLimit)
    );

    useEffect(() => {
        setMaxDuration(
            typeof value === 'object' ? value.max : (value || maxDurationLimit)
        );
    }, [value, maxDurationLimit]);

  const handleChange = (event) => {
    const newMax = parseInt(event.target.value, 10);
    setMaxDuration(newMax);
    onChange(newMax);
  };

  return (
    <div className={s.durationFilter}>
      <h3>Durée maximale</h3>
      <div className={s.sliderContainer}>
        <input
          type="range"
          min="0"
          max={maxDurationLimit}
          value={maxDuration}
          onChange={handleChange}
          className={s.slider}
        />
        <div className={s.durationDisplay}>
          {maxDuration} min
        </div>
      </div>
    </div>
  );
};

export default DurationFilter;