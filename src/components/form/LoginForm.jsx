import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';

const LoginForm = () => {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (!pseudo) {
            setErrors(prev => ({ ...prev, pseudo: 'Le pseudo est requis' }));
        }
        if (!password) {
            setErrors(prev => ({ ...prev, password: 'Le mot de passe est requis' }));
        }

        if (pseudo && password) {
            // Simuler une connexion réussie
            dispatch(login({ pseudo, avatar: 'default-avatar.png' }));
            localStorage.setItem('user', JSON.stringify({ pseudo, avatar: 'default-avatar.png' }));
            navigate('/');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <h1 className={s.connexion}>Connexion</h1>
            <div className={s.pseudo}>
                <div className={s.label}>
                    <label htmlFor="pseudo">Pseudo</label><span className={s.needed}>*</span>
                </div>
                <input
                    type="text"
                    id="pseudo"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    className={s.input}
                />
                <br />
                {errors.pseudo && <span className={s.error}>{errors.pseudo}</span>}
            </div>
            <div className={s.password}>
                <div className={s.label}>
                    <label htmlFor="password">Mot de passe</label><span className={s.needed}>*</span>
                </div>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={s.input}
                />
                <br />
                {errors.password && <span className={s.error}>{errors.password}</span>}
            </div>
            <button type="submit" className={s.submit}>Se connecter</button>
        </form>
    );
};

export default LoginForm;