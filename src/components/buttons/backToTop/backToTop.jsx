import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import s from './styles.module.css';
import backToTop from '../../../images/buttons/back-to-top.svg';
import message from '../../../images/icon/mail.svg';

const BackToTop = () => {
    // The back-to-top button is hidden at the beginning
    const [showButton, setShowButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // This function will scroll the window to the top 
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    };

    return (
        <div className={s.backToTop}>
            {showButton && (
                <button onClick={scrollToTop} className={s.button}>
                    <img src={backToTop} alt="back to top" />
                </button>
            )}
            {showButton && (
                <Link to='/contact' className={s.message}>
                    <img src={message} alt="contact" />
                </Link>
            )}
        </div>
    );
};

export default BackToTop;