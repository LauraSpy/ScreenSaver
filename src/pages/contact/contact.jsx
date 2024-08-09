// src/pages/contact/contact.jsx
import React, { useState, useRef } from 'react';
import s from './styles.module.css';
import ellipse from '../../images/bulles/Ellipse5.svg';

const ContactForm = () => {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const svgRef = useRef(null); //pour la bulle du background animé

    const MAX_MESSAGE_LENGTH = 500; //max de caractère qui peuvent être envoyé dans la case "message"
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //pattern créé pour vérifier que l'adresse mail est bien valide

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (!pseudo) {
            setErrors(prev => ({ ...prev, pseudo: 'Le pseudo est requis' }));
        }
        if (!email) {
            setErrors(prev => ({ ...prev, email: 'L\'email est requis' }));
        } else if (!emailPattern.test(email)) {
            setErrors(prev => ({ ...prev, email: 'L\'email est invalide' }));
        }
        if (!message) {
            setErrors(prev => ({ ...prev, message: 'Le message est requis' }));
        } else if (message.length > MAX_MESSAGE_LENGTH) {
            setErrors(prev => ({ ...prev, message: `Le message ne doit pas dépasser ${MAX_MESSAGE_LENGTH} caractères` }));
        }

        if (pseudo && emailPattern.test(email) && message && message.length <= MAX_MESSAGE_LENGTH && Object.keys(errors).length === 0) {
            console.log('Message envoyé:', { pseudo, email, message });
            setPseudo('');
            setEmail('');
            setMessage('');
            alert('Message envoyé avec succès!');
        }
    };

    const handleMessageChange = (e) => {
        const newMessage = e.target.value;
        setMessage(newMessage);
        if (newMessage.length > MAX_MESSAGE_LENGTH) {
            setErrors(prev => ({ ...prev, message: `Le message ne doit pas dépasser ${MAX_MESSAGE_LENGTH} caractères` }));
        } else {
            setErrors(prev => {
                const { message, ...rest } = prev;
                return rest;
            });
        }
    };

    return (
        <div className={s.body}>
            <form onSubmit={handleSubmit} className={s.form}>
                    {/* AJOUT DES IMAGES POUR LE FOND ANIME */}
                    <div className={s.bubblesBackground}>
                        <img ref={svgRef} src={ellipse} alt="ellipse animé floue" className={s.backgroundSvg} />
                    </div>
                <h1 className={s.contactTitle}>Contactez-nous</h1>
                <div className={s.pseudo}>
                    <input
                        type="text"
                        id="pseudo"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        className={s.input}
                        placeholder="Pseudo"
                    />
                    <span className={s.needed}>*</span>
                    {errors.pseudo && <span className={s.error}>{errors.pseudo}</span>}
                </div>
                <div className={s.email}>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={s.input}
                        placeholder="Email"
                    />
                    <span className={s.needed}>*</span>
                    {errors.email && <span className={s.error}>{errors.email}</span>}
                </div>
                <div className={s.message}>
                    <textarea
                        id="message"
                        value={message}
                        onChange={handleMessageChange}
                        className={`${s.input} ${s.textarea}`}
                        rows="5"
                        placeholder="Message"
                    />
                    <div className={s.characterCount}>
                        {message.length}/{MAX_MESSAGE_LENGTH}
                    </div>
                    {errors.message && <span className={s.error}>{errors.message}</span>}
                </div>
                <button type="submit" className={s.submit}>Envoyer</button>
            </form>
        </div>
    );
};

export default ContactForm;
