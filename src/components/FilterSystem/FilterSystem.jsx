import React, { useState } from 'react';
import MediaTypeFilter from './MediaTypeFilter/MediaTypeFilter';
import StreamingCinemaFilter from './StreamingCinemaFilter/StreamingCinemaFilter';
import ViewingStatusFilter from './ViewingStatusFilter/ViewingStatusFilter';
import GenreFilter from './GenreFilter/GenreFilter';
import DurationFilter from './DurationFilter/DurationFilter';
import KeywordFilter from './KeywordFilter/KeywordFilter';
import styles from './styles.module.css';

const FilterSystem = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    mediaType: 'all',
    streamingCinema: 'all',
    viewingStatus: 'all',
    genres: [],
    duration: { min: 0, max: 300 },
    keywords: ''
  });

  const updateFilters = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={styles.filterSystem}>
      <MediaTypeFilter 
        value={filters.mediaType} 
        onChange={(value) => updateFilters('mediaType', value)} 
      />
      <StreamingCinemaFilter 
        value={filters.streamingCinema} 
        onChange={(value) => updateFilters('streamingCinema', value)} 
      />
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
      />
      <KeywordFilter 
        value={filters.keywords} 
        onChange={(value) => updateFilters('keywords', value)} 
      />
    </div>
  );
};

export default FilterSystem;