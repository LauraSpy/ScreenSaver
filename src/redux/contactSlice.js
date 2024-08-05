import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pseudo: '',
    email: '',
    message: '',
};

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        updateContactForm: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearContactForm: () => initialState,
    },
});

export const { updateContactForm, clearContactForm } = contactSlice.actions;

export default contactSlice.reducer;