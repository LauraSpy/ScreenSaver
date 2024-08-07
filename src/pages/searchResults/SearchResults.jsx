import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sliders from '../../components/sliders/itemSliders/sliders';
import { searchItems } from '../../api/api-tmdb'; 
import Pagination from '../../components/Pagination/Pagination';
import s from './styles.module.css';

const ITEMS_PER_PAGE = 50;

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const query = searchParams.get('query');
  const currentPage = Number(searchParams.get('page') || '1');

  useEffect(() => {
    if (query) {
      loadItems(query, currentPage);
    }
  }, [query, currentPage]);

  const loadItems = async (query, page) => {
    setLoading(true);
    try {
        const data = await searchItems(query, page);
        setItems(data.results.slice(0, ITEMS_PER_PAGE));
        setTotalPages(Math.min(data.total_pages, 500));
    } catch (error) {
        console.error('Erreur lors du chargement des éléments:', error);
    }
    setLoading(false);
};

  const handlePageChange = (newPage) => {
    setSearchParams({ query, page: newPage.toString() });
  };

  return (
    <div className={s.SearchResults}>
      <div className={s.container}>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <>
            {items.length > 0 ? (
              <Sliders
                title={`Résultats pour: "${query}"`}
                items={items}
                isListView={true}
              />
            ) : (
              <p>Aucun élément trouvé.</p>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
