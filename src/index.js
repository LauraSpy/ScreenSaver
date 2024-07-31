import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailFilm from './pages/detail/detail.jsx';
import UserProfilePage from './pages/profil/profil.jsx';
import Contact from './pages/contact/contact.jsx';
import Home from './pages/home/homepage.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />  Default route for the base path
          <Route path="/movies/:type/:id" element={<DetailFilm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
