import React, { useState } from 'react';
import StreamingCinemaFilter from './StreamingCinemaFilter/StreamingCinemaFilter';
import ViewingStatusFilter from './ViewingStatusFilter/ViewingStatusFilter';
import GenreFilter from './GenreFilter/GenreFilter';
import DurationFilter from './DurationFilter/DurationFilter';
import KeywordFilter from './KeywordFilter/KeywordFilter';
import s from './styles.module.css';
import right from '../../images/buttons/right.svg';
import bottom from '../../images/buttons/bottom.svg';

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
    const updatedFilters = {
      ...filters,
      [filterType]: value
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // fait appel à onFilterChange pour mettre à jour les filtres
  };

  const handleSearch = () => {
    onFilterChange(filters); //s'assure que le dernier filtres est positionné en "recherche"
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
            <img 
              src={openDropdown === 'streamingCinema' ? bottom : right} 
              alt="dropdown icon" 
              className={s.dropdownIcon}
            />
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
            <img 
              src={openDropdown === 'filters' ? bottom : right} 
              alt="dropdown icon" 
              className={s.dropdownIcon}
            />
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