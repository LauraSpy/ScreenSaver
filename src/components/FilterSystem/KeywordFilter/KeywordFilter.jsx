import React, { useState, useEffect } from 'react';
import s from './styles.module.css';

const KeywordFilter = ({ value, onChange }) => {
    const [keyword, setKeyword] = useState(value || '');

    useEffect(() => {
        setKeyword(value || '');
    }, [value]);

    const handleChange = (event) => {
        const newKeyword = event.target.value;
        setKeyword(newKeyword);
        onChange(newKeyword); // Met à jour le state du parent sans déclencher la recherche
    };

    return (
        <div className={s.keywordFilter}>
            <h3>Mot-clé</h3>
            <div className={s.keywordInputWrapper}>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleChange}
                    placeholder="Rechercher par mot-clé"
                    className={s.keywordInput}
                />
            </div>
        </div>
    );
};

export default KeywordFilter;
