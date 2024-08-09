import { createSlice } from '@reduxjs/toolkit';

// Ce fichier simule une authentification d'utilisateur en utilisant Redux Toolkit.

// État initial de l'authentification
const initialState = {
    user: {
        // L'état initial de l'utilisateur avec des propriétés par défaut
        pseudo: 'JohnDoe',
        banner: null,
        avatar: null,
    },
    isAuthenticated: false, // Indique si l'utilisateur est authentifié
};

// Création d'un slice Redux pour l'authentification
export const authSlice = createSlice({
    name: 'auth', // Nom du slice
    initialState,
    reducers: {
        // Action pour connecter un utilisateur
        login: (state, action) => {
            state.user = action.payload; // Met à jour les informations de l'utilisateur avec les données fournies
            state.isAuthenticated = true; // Définit l'utilisateur comme authentifié
        },
        // Action pour déconnecter un utilisateur
        logout: (state) => {
            state.user = {
                pseudo: '',  // Réinitialise le pseudo, bannière et avatar (en-dessous)
                banner: null,
                avatar: null,
            };
            state.isAuthenticated = false; // Définit l'utilisateur comme non authentifié
        },
        updateProfile: (state, action) => {
            state.user = { ...state.user, ...action.payload }; // Met à jour le profil utilisateur avec les nouvelles données
        },
    },
});

// Exportation des actions pour les utiliser dans les composants
export const { login, logout, updateProfile } = authSlice.actions;

// Exportation du reducer pour l'ajouter au store Redux
export default authSlice.reducer;