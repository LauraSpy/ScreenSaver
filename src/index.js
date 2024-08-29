import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import DetailFilm from './pages/detail/detail.jsx';
import UserProfilePage from './pages/profil/profil.jsx';
import Contact from './pages/contact/contact.jsx';
import Home from './pages/home/homepage.jsx';
import TermsOfService from '../src/components/TermsOfService/TermsOfService.jsx';
import ListItems from './pages/listItems/listItems.jsx';
import ProtectedRoutes from './utils/ProtectedRoutes.jsx';
import LoginForm from './components/form/LoginForm.jsx';
import SearchResults from './pages/searchResults/SearchResults.jsx';

// Création du point d'entrée de l'application React
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // React.StrictMode est un outil pour mettre en évidence les problèmes potentiels dans une application
  <React.StrictMode>
    {/* Provider rend le store Redux disponible pour tous les composants imbriqués */}
    <Provider store={store}>
      {/* BrowserRouter permet d'utiliser le routage dans l'application */}
      <BrowserRouter>
        {/* Définition des routes de l'application */}
        <Routes>
          {/* Route principale qui englobe toutes les autres */}
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/detail/:type/:id" element={<DetailFilm />} />
            <Route path="/list/:mediaType/:listType" element={<ListItems />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<SearchResults />} />
            {/* Routes protégées (nécessitant une authentification) */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<UserProfilePage />} />
            </Route>
            <Route path="/terms" Component={TermsOfService} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// Mesure des performances de l'application
reportWebVitals();