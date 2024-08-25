import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sliders from '../../components/sliders/itemSliders/sliders';
import { searchItems } from '../../api/api-tmdb'; 
import Pagination from '../../components/Pagination/Pagination';
import s from './styles.module.css';

// Nombre maximum d'éléments à afficher par page
const ITEMS_PER_PAGE = 50;

const SearchResults = () => {
  // Utilisation de useSearchParams pour gérer les paramètres de l'URL
  const [searchParams, setSearchParams] = useSearchParams();
  // État pour stocker les résultats de recherche
  const [items, setItems] = useState([]);
  // État pour gérer le chargement
  const [loading, setLoading] = useState(false);
  // État pour le nombre total de pages de résultats
  const [totalPages, setTotalPages] = useState(0);

  // Extraction de la requête et du numéro de page depuis les paramètres de l'URL
  const query = searchParams.get('query');
  const currentPage = Number(searchParams.get('page') || '1');

  // Effet pour charger les résultats quand la requête ou la page change
  useEffect(() => {
    if (query) {
      loadItems(query, currentPage);
    }
  }, [query, currentPage]);

  // Fonction pour charger les résultats de recherche
  const loadItems = async (query, page) => {
    setLoading(true);
    try {
        const data = await searchItems(query, page);
        // Limite le nombre d'éléments affichés à ITEMS_PER_PAGE
        setItems(data.results.slice(0, ITEMS_PER_PAGE));
        // Limite le nombre total de pages à 500 maximum
        setTotalPages(Math.min(data.total_pages, 500));
    } catch (error) {
        console.error('Erreur lors du chargement des éléments:', error);
    }
    setLoading(false);
  };

  // Fonction pour gérer le changement de page
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
              // Affichage des résultats avec le composant Sliders
              <Sliders
                title={`Résultats pour: "${query}"`}
                items={items}
                isListView={true}
              />
            ) : (
              <p>Aucun élément trouvé.</p>
            )}
            {/* Composant de pagination */}
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