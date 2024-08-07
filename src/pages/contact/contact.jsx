// src/pages/contact/contact.jsx
import React, { useState } from 'react';
import s from './styles.module.css';

const ContactForm = () => {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const MAX_MESSAGE_LENGTH = 500;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (!pseudo) {
            setErrors(prev => ({ ...prev, pseudo: 'Le pseudo est requis' }));
        }
        if (!email) {
            setErrors(prev => ({ ...prev, email: 'L\'email est requis' }));
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors(prev => ({ ...prev, email: 'L\'email est invalide' }));
        }
        if (!message) {
            setErrors(prev => ({ ...prev, message: 'Le message est requis' }));
        } else if (message.length > MAX_MESSAGE_LENGTH) {
            setErrors(prev => ({ ...prev, message: `Le message ne doit pas dépasser ${MAX_MESSAGE_LENGTH} caractères` }));
        }

        if (pseudo && email && message && message.length <= MAX_MESSAGE_LENGTH && Object.keys(errors).length === 0) {
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
        <form onSubmit={handleSubmit} className={s.form}>
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
    );
};

export default ContactForm;
