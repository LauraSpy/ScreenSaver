import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="pseudo">Pseudo</label>
                <input
                    type="text"
                    id="pseudo"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                />
                {errors.pseudo && <span>{errors.pseudo}</span>}
            </div>
            <div>
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span>{errors.password}</span>}
            </div>
            <button type="submit">Se connecter</button>
        </form>
    );
};

export default LoginForm;