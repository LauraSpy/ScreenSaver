import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, logout } from '../../redux/authSlice';
import defaultBanner from '../../images/banner/banner-default.png';
import defaultAvatar from '../../images/avatar/avatar-default.png';
import banner1 from '../../images/banner/banner1.webp';
import banner2 from '../../images/banner/banner2.jpg';
import avatar1 from '../../images/avatar/avatar1.jpg';
import avatar2 from '../../images/avatar/avatar2.jpg';
import Sliders from '../../components/sliders/itemSliders/sliders';
import { getTrending } from '../../api/api-tmdb';
import s from './styles.module.css';
import CircularProgressBar from '../progressBar/CircularProgressBar';
import ellipse from '../../images/bulles/Ellipse4.svg';

const UserProfile = () => {
  // Utilisation de useSelector pour accéder aux données de l'utilisateur dans le store Redux
  const user = useSelector((state) => state.auth.user);
  // useDispatch pour envoyer des actions à Redux
  const dispatch = useDispatch();

  // Définition des options pour les bannières et avatars
  // useState est utilisé ici pour initialiser ces tableaux une seule fois
  const [bannerOptions] = useState([defaultBanner, banner1, banner2]);
  const [avatarOptions] = useState([defaultAvatar, avatar1, avatar2]);

  // Création de références pour manipuler directement des éléments DOM
  const bannerRef = useRef(null);
  const svgRef = useRef(null);

  // Fonction pour changer l'image de profil ou de bannière
  const handleImageChange = (type) => {
    const options = type === 'banner' ? bannerOptions : avatarOptions;
    // Trouve l'index actuel de l'image
    const currentIndex = options.indexOf(user[type] || options[0]);
    // Calcule le prochain index (boucle si on atteint la fin)
    const nextIndex = (currentIndex + 1) % options.length;
    const newImage = options[nextIndex];
    // Dispatch une action pour mettre à jour le profil dans Redux
    dispatch(updateProfile({ [type]: newImage }));
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    dispatch(logout());
    alert('Vous avez été déconnecté.');
  };

  // Effet pour animer la bannière lors du défilement
  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const scrollPosition = window.scrollY;
        const bannerElement = bannerRef.current;
        const bannerHeight = 60; // Hauteur initiale en vh
        const maxHeight = 80; // Hauteur maximale en vh
        // Calcul du pourcentage de défilement
        const scrollPercentage = Math.min(scrollPosition / (window.innerHeight * 0.5), 1);
        // Calcul de la nouvelle hauteur
        const newHeight = bannerHeight + scrollPercentage * (maxHeight - bannerHeight);
        bannerElement.style.height = `${newHeight}vh`;
        
        // Ajustement de l'opacité en fonction du défilement
        bannerElement.style.opacity = 1 - scrollPercentage * 0.5;
      }
    };

    // Utilisation de requestAnimationFrame pour optimiser les performances
    const handleScrollWithRAF = () => {
      requestAnimationFrame(handleScroll);
    };

    // Ajout de l'écouteur d'événement pour le défilement
    window.addEventListener('scroll', handleScrollWithRAF);
    // Nettoyage : suppression de l'écouteur lors du démontage du composant
    return () => window.removeEventListener('scroll', handleScrollWithRAF);
  }, []);

  // États pour stocker les films et séries tendances
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);

  // Effet pour charger les films et séries tendances au montage du composant
  useEffect(() => {
      const fetchMovies = async () => {
          try {
              const trendingMoviesData = await getTrending('movie');
              setTrendingMovies(trendingMoviesData.results);

              const trendingTVShowsData = await getTrending('tv');
              setTrendingTVShows(trendingTVShowsData.results);
          } catch (error) {
              console.error("Erreur lors de la récupération des films:", error);
          }
      };

      fetchMovies();
  }, []);

  // Données de progression simulées 
  const progress = {
    moviesWatched: { total: 550, percentage: 90 },
    seriesWatched: { total: 130, percentage: 55 },
    rated: { total: 240, percentage: 41 },
    favorites: { total: 420, percentage: 73 },
    toWatch: { total: 100, percentage: 18 },
  };

  return (
    <div>
      {/* Conteneur de la bannière avec référence pour l'animation */}
      <div className={s.bannerContainer} ref={bannerRef}>
        <img className={s.banner} src={user.banner || defaultBanner} alt="Bannière" />
        <button className={s.changeBanner} onClick={() => handleImageChange('banner')}>
          <i className="fas fa-pencil-alt"></i>
        </button>
      </div>
      
      {/* Conteneur de l'avatar avec gestion d'erreur de chargement */}
      <div className={s.avatarContainer}>
        <img 
          className={s.avatar} 
          src={user.avatar || defaultAvatar} 
          alt="Avatar"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = defaultAvatar;
          }} 
        />
        <button className={s.changeAvatar} onClick={() => handleImageChange('avatar')}>
          <i className="fas fa-pencil-alt"></i>
        </button>
      </div>
      
      {/* Corps principal du profil */}
      <div className={s.bodyBubbles}>
        {/* Arrière-plan avec effet de bulle */}
        <div className={s.bubblesBackground}>
          <img ref={svgRef} src={ellipse} alt="ellipse animé floue" className={s.backgroundSvg} />
        </div>
        
        {/* Nom d'utilisateur et bouton de déconnexion */}
        <h2 className={s.username}>
          {user.pseudo}
          <button className={s.logoutButton} onClick={handleLogout}>
            Déconnexion
          </button>
        </h2>
        
        {/* Section des barres de progression */}
        <div className={s.progressSection}>
          <h3 className={s.collection}>Ma Collection</h3>
          <div className={s.progressBars}>
            {/* Utilisation du composant CircularProgressBar pour chaque statistique */}
            <CircularProgressBar 
              percentage={progress.moviesWatched.percentage} 
              label="Total films vus" 
              total={progress.moviesWatched.total} 
            />
            <CircularProgressBar 
              percentage={progress.seriesWatched.percentage} 
              label="Total séries vues" 
              total={progress.seriesWatched.total} 
            />
            <CircularProgressBar 
              percentage={progress.rated.percentage} 
              label="Total /séries noté(e)s" 
              total={progress.rated.total} 
            />
            <CircularProgressBar 
              percentage={progress.favorites.percentage} 
              label="Total films/séries favoris" 
              total={progress.favorites.total} 
            />
            <CircularProgressBar 
              percentage={progress.toWatch.percentage} 
              label="Total films/séries à voir" 
              total={progress.toWatch.total} 
            />
          </div>
        </div>
      </div>
      
      {/* Sliders pour afficher les listes de films et séries */}
      <Sliders title="Ma Liste" items={trendingMovies} type="movie" />
      <Sliders title="Favoris" items={trendingTVShows} type="tv" />
    </div>   
  );
};

export default UserProfile;