import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice';
import './App.css';
import s from './style.module.css';
import Header from './components/header/header';
import { Outlet } from 'react-router-dom'; //plus récente, l'utilisation de Outlet permet d'éviter de définir toutes les routes dans le fichier App, ce qui rend la lecture du code plus lisible
import BackToTop from './components/buttons/backToTop/backToTop';
import Footer from './components/footer/footer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(login(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <div className={s.App}>
      <BackToTop />
      <Header />
      {/* les routes sont donc définies dans le fichier index.js */}
      <Outlet /> 
      <Footer />
    </div>
  );
}

export default App;
