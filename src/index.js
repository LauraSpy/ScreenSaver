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
import ListItems from './pages/listItems/listItems.jsx';
import ProtectedRoutes from './utils/ProtectedRoutes.jsx';
import LoginForm from './components/form/LoginForm.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/detail/:type/:id" element={<DetailFilm />} />
            <Route path="/list/:mediaType/:listType" element={<ListItems />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/contact" element={<Contact />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<UserProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();