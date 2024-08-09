import React, { useEffect } from 'react';
import { getSessionToken } from '../api/authToken'; // Assurez-vous que cette fonction est importée

const CallbackPage = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const requestToken = urlParams.get('request_token');
        const approved = urlParams.get('approved');

        if (approved === 'true' && requestToken) {
            const fetchSessionToken = async () => {
                try {
                    const sessionToken = await getSessionToken(requestToken);
                    console.log('Token de session obtenu:', sessionToken);
                    // Stockez le token de session pour une utilisation future
                } catch (error) {
                    console.error('Erreur lors de l\'obtention du token de session:', error);
                }
            };

            fetchSessionToken();
        }
    }, []);

    return <div>Authentification réussie, vous êtes de retour dans l'application.</div>;
};

export default CallbackPage;