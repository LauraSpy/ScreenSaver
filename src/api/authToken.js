const API_KEY = '26ea4fd02b2f408aa82a007499337145';
const BASE_URL = 'https://api.themoviedb.org/3';

// Fonction pour obtenir un token de demande
export const getRequestToken = async () => {
    const response = await fetch(`${BASE_URL}/authentication/token/new?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération du token de demande');
    }
    const data = await response.json();
    return data.request_token;
};

// Fonction pour obtenir un token de session
export const getSessionToken = async (requestToken) => {
    const response = await fetch(`${BASE_URL}/authentication/session/new?api_key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ request_token: requestToken }),
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la création du token de session');
    }
    const data = await response.json();
    return data.session_id;
};