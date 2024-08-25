import React, { useEffect } from 'react';
import { getSessionToken } from '../api/authToken'; // Importation de la fonction pour obtenir le token de session

const CallbackPage = () => {
    // useEffect est utilisé pour exécuter du code après le rendu du composant
    useEffect(() => {
        // Extraction des paramètres de l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const requestToken = urlParams.get('request_token');
        const approved = urlParams.get('approved');

        // Vérification si l'authentification a été approuvée et si un token de requête est présent
        if (approved === 'true' && requestToken) {
            // Définition d'une fonction asynchrone pour obtenir le token de session
            const fetchSessionToken = async () => {
                try {
                    // Appel à l'API pour obtenir le token de session
                    const sessionToken = await getSessionToken(requestToken);
                    console.log('Token de session obtenu:', sessionToken);
                    // Ici, vous pouvez stocker le token de session (par exemple dans le localStorage)
                    // et rediriger l'utilisateur vers la page principale de l'application
                } catch (error) {
                    console.error('Erreur lors de l\'obtention du token de session:', error);
                    // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
                }
            };

            // Exécution de la fonction pour obtenir le token de session
            fetchSessionToken();
        }
    }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une fois, au montage du composant

    // Rendu du composant
    return <div>Authentification réussie, vous êtes de retour dans l'application.</div>;
};

export default CallbackPage;