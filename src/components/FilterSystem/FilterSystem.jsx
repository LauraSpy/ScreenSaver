import React, { useState } from 'react';
import ViewingStatusFilter from './ViewingStatusFilter/ViewingStatusFilter';
import GenreFilter from './GenreFilter/GenreFilter';
import s from './styles.module.css';
import right from '../../images/buttons/right.svg';
import bottom from '../../images/buttons/bottom.svg';

const FilterSystem = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    streamingCinema: 'all',
    viewingStatus: 'all',
    genres: [],
  });

  const [openDropdown, setOpenDropdown] = useState(null);

  const updateFilters = (filterType, value) => {
    const updatedFilters = {
      ...filters,
      [filterType]: value
    };
    setFilters(updatedFilters);
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
