import React, { useState } from 'react';
import StreamingCinemaFilter from './StreamingCinemaFilter/StreamingCinemaFilter';
import ViewingStatusFilter from './ViewingStatusFilter/ViewingStatusFilter';
import GenreFilter from './GenreFilter/GenreFilter';
import DurationFilter from './DurationFilter/DurationFilter';
import KeywordFilter from './KeywordFilter/KeywordFilter';
import s from './styles.module.css';

const FilterSystem = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    streamingCinema: 'all',
    viewingStatus: 'all',
    genres: [],
    duration: { min: 0, max: 300 },
    keywords: ''
  });

  const [openDropdown, setOpenDropdown] = useState(null);

  const updateFilters = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  const handleSearch = () => {
    onFilterChange(filters);
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className={s.filterSystem}>
      <div className={s.filterRow}>
      <div className={`${s.dropdownContainer} ${openDropdown === 'streamingCinema' ? s.active : ''}`}>
          <button onClick={() => toggleDropdown('streamingCinema')} className={s.dropdownButton}>
            Streaming/Cinéma
          </button>
          <div className={s.dropdownContent}>
            <StreamingCinemaFilter 
              value={filters.streamingCinema} 
              onChange={(value) => updateFilters('streamingCinema', value)} 
            />
          </div>
        </div>

        <div className={`${s.dropdownContainer} ${openDropdown === 'filters' ? s.active : ''}`}>
          <button onClick={() => toggleDropdown('filters')} className={s.dropdownButton}>
            Filtrer
          </button>
          <div className={s.dropdownContent}>
            <ViewingStatusFilter 
              value={filters.viewingStatus} 
              onChange={(value) => updateFilters('viewingStatus', value)} 
            />
            <GenreFilter 
              selectedGenres={filters.genres} 
              onChange={(value) => updateFilters('genres', value)} 
            />
            <DurationFilter 
                value={filters.duration}
                onChange={(value) => updateFilters('duration', value)}
                maxDurationLimit={300} 
            />
            <KeywordFilter 
              value={filters.keywords} 
              onChange={(value) => updateFilters('keywords', value)} 
            />
          </div>
        </div>
      </div>

      <button className={s.searchButton} onClick={handleSearch}>
        Rechercher
      </button>
    </div>
  );
};

export default FilterSystem;