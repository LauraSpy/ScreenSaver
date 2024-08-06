import { createSlice } from '@reduxjs/toolkit';

//Fichier créés pour simuler une authentification d'un utilisateur. 

const initialState = {
    user: { //dans l'état initiale de user, on initialise les états qui seront modifiés lors de la connexion de l'uilisateur
        pseudo: 'JohnDoe',
        banner: null,
        avatar: null,
    },
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = {
                pseudo: '',
                banner: null,
                avatar: null, //initialisé l'avatar ici va permettre de mettre à jour l'état de l'avatar dans le header lorsque l'utilisateur le modifie dans son profil
            };
            state.isAuthenticated = false;
        },
        updateProfile: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
    },
});

export const { login, logout, updateProfile } = authSlice.actions;

export default authSlice.reducer;