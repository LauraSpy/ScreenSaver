import React from 'react';
import s from './styles.module.css';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    const getPaginationItems = () => {
        const pages = [];
        const maxPagesToShow = 5; // Nombre maximum de pages à afficher dans la pagination

        if (totalPages <= maxPagesToShow) {
            // Si le nombre total de pages est inférieur ou égal au maxPagesToShow, afficher toutes les pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Si le nombre total de pages est supérieur au maxPagesToShow
            const startPage = Math.max(1, currentPage - 1);
            const endPage = Math.min(totalPages, currentPage + 1);

            // Ajouter la première page
            if (startPage > 1) {
                pages.push(1);
            }

            // Ajouter les pages intermédiaires
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            // Ajouter les points de suspension si nécessaire
            if (endPage < totalPages - 1) {
                pages.push('...');
            }

            // Ajouter les deux dernières pages
            if (endPage < totalPages - 1) {
                pages.push(totalPages - 1);
            }
            if (endPage < totalPages) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className={s.pagination}>
            <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={currentPage === 1 ? s.disabledButton : ''}
            >
                &lt;
            </button>
            {getPaginationItems().map((page, index) => (
                <button 
                    key={index}
                    onClick={() => handlePageChange(page)}
                    disabled={page === '...'}
                    className={page === currentPage ? s.activePage : ''}
                >
                    {page}
                </button>
            ))}
            <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={currentPage === totalPages ? s.disabledButton : ''}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;