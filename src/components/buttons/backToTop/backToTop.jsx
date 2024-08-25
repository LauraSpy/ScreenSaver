import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import s from './styles.module.css';
import backToTop from '../../../images/buttons/back-to-top.svg';
import message from '../../../images/icon/mail.svg';

const BackToTop = () => {
    // État pour contrôler la visibilité du bouton "retour en haut"
    const [showButton, setShowButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fonction pour gérer le défilement
        const handleScroll = () => {
            // Affiche le bouton si l'utilisateur a défilé de plus de 150 pixels
            if (window.scrollY > 150) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        // Ajoute un écouteur d'événement pour le défilement
        window.addEventListener("scroll", handleScroll);

        // Fonction de nettoyage pour retirer l'écouteur d'événement
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une fois au montage

    // Fonction pour faire défiler la fenêtre vers le haut
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Pour un défilement fluide
        });
    };

    return (
        <div className={s.backToTop}>
            {/* Affiche le bouton "retour en haut" si showButton est true */}
            {showButton && (
                <button onClick={scrollToTop} className={s.button}>
                    <img src={backToTop} alt="back to top" />
                </button>
            )}
            {/* Affiche le bouton de contact si showButton est true */}
            {showButton && (
                <Link to='/contact' className={s.message}>
                    <img src={message} alt="contact" />
                </Link>
            )}
        </div>
    );
};

export default BackToTop;