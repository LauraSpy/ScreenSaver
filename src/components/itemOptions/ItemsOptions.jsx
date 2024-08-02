import React, { useState } from 'react';
import s from './styles.module.css';
import ellipse from '../../images/icon/ellipsis.svg';
import DropdownMenu from '../dropdownMenu/dropdownMenu';

const ItemOptions = ({ itemId, onViewDetails, posterPath, title }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={s.itemOptionsContainer}>
            <button
                onClick={toggleDropdown}
                className={s.ellipseButton}
            >
                <img className={s.ellipse} src={ellipse} alt="bouton des détails" />
            </button>
            {isDropdownOpen ? (
                <div className={s.dropdownContainer}>
                    <DropdownMenu
                        onClose={() => setIsDropdownOpen(false)}
                        onViewDetails={() => {
                            onViewDetails(itemId);
                            setIsDropdownOpen(false);
                        }}
                    />
                </div>
            ) : (
                <div className={s.itemCard}>
                    {/* pour rappeler l'item card et créé l'effet de survol */}
                </div>
            )}
        </div>
    );
};

export default ItemOptions;