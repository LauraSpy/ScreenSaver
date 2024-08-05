import React, { useState } from 'react';
import s from './styles.module.css';

const StreamingCinemaFilter = ({ value, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(value);

  const handleOptionChange = (option) => {
    const newValue = selectedOption === option ? 'all' : option;
    setSelectedOption(newValue);
    onChange(newValue);
  };

  return (
    <div className={s.streamingCinemaFilter}>
      <div className={s.buttons}>
        <button
          className={`${s.button} ${selectedOption === 'streaming' ? s.selected : ''}`}
          onClick={() => handleOptionChange('streaming')}
        >
          Streaming
        </button>
        <button
          className={`${s.button} ${selectedOption === 'cinema' ? s.selected : ''}`}
          onClick={() => handleOptionChange('cinema')}
        >
          Cinéma
        </button>
      </div>
    </div>
  );
};

export default StreamingCinemaFilter;