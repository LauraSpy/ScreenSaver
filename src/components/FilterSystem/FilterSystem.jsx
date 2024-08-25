import React, { useState } from 'react';
import ViewingStatusFilter from './ViewingStatusFilter/ViewingStatusFilter';
import GenreFilter from './GenreFilter/GenreFilter';
import KeywordFilter from './KeywordFilter/KeywordFilter';
import s from './styles.module.css';
import right from '../../images/buttons/right.svg';
import bottom from '../../images/buttons/bottom.svg';

const FilterSystem = ({ onFilterChange }) => {
  // État pour stocker les filtres actuels
  const [filters, setFilters] = useState({
    streamingCinema: 'all',
    viewingStatus: 'all',
    genres: [],
    duration: { min: 0, max: 300 },
    keywords: ''
  });

  // État pour gérer l'ouverture/fermeture du dropdown
  const [openDropdown, setOpenDropdown] = useState(null);

  // Fonction pour mettre à jour un filtre spécifique
  const updateFilters = (filterType, value) => {
    const updatedFilters = {
      ...filters,
      [filterType]: value
    };
    setFilters(updatedFilters);
  };

  // Fonction pour déclencher la recherche avec les filtres actuels
  const handleSearch = () => {
    onFilterChange(filters); // Appelle la fonction passée en prop avec les filtres actuels
    setOpenDropdown(null); // Ferme le dropdown après la recherche
  };

  // Fonction pour basculer l'ouverture/fermeture du dropdown
  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className={s.filterSystem}>
      <div className={s.filterRow}>
        <div className={`${s.dropdownContainer} ${openDropdown === 'filters' ? s.active : ''}`}>
          {/* Bouton pour ouvrir/fermer le dropdown des filtres */}
          <button onClick={() => toggleDropdown('filters')} className={s.dropdownButton}>
            Filtrer
            <img 
              src={openDropdown === 'filters' ? bottom : right} 
              alt="dropdown icon" 
              className={s.dropdownIcon}
            />
          </button>
          {/* Contenu du dropdown */}
          <div className={s.dropdownContent}>
            {/* Composant pour filtrer par statut de visionnage */}
            <ViewingStatusFilter 
              value={filters.viewingStatus} 
              onChange={(value) => updateFilters('viewingStatus', value)} 
            />
            {/* Composant pour filtrer par genre */}
            <GenreFilter 
              selectedGenres={filters.genres} 
              onChange={(value) => updateFilters('genres', value)} 
            />
            {/* Composant pour filtrer par mot-clé */}
            <KeywordFilter 
              value={filters.keywords} 
              onChange={(value) => updateFilters('keywords', value)} 
            />
          </div>
        </div>
      </div>

      {/* Bouton pour déclencher la recherche */}
      <button className={s.searchButton} onClick={handleSearch}>
        Rechercher
      </button>
    </div>
  );
};

export default FilterSystem;