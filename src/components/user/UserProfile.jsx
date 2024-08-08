import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/authSlice';
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
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [bannerOptions] = useState([defaultBanner, banner1, banner2]);
  const [avatarOptions] = useState([defaultAvatar, avatar1, avatar2]);
  const bannerRef = useRef(null);
  const svgRef = useRef(null);

  const handleImageChange = (type) => {
    const options = type === 'banner' ? bannerOptions : avatarOptions;
    const currentIndex = options.indexOf(user[type] || options[0]);
    const nextIndex = (currentIndex + 1) % options.length;
    const newImage = options[nextIndex];
    dispatch(updateProfile({ [type]: newImage }));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const scrollPosition = window.scrollY;
        const bannerElement = bannerRef.current;
        const bannerHeight = 60; // Hauteur initiale en vh
        const maxHeight = 80; // Hauteur maximale en vh
        const scrollPercentage = Math.min(scrollPosition / (window.innerHeight * 0.5), 1);
        const newHeight = bannerHeight + scrollPercentage * (maxHeight - bannerHeight);
        bannerElement.style.height = `${newHeight}vh`;
        
        // Ajuster l'opacité
        bannerElement.style.opacity = 1 - scrollPercentage * 0.5;
      }
    };

    const handleScrollWithRAF = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', handleScrollWithRAF);
    return () => window.removeEventListener('scroll', handleScrollWithRAF);
  }, []);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);

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

  // Simuler des données de progression
  const progress = {
    moviesWatched: { total: 550, percentage: 90 },
    seriesWatched: { total: 130, percentage: 55 },
    rated: { total: 240, percentage: 41 },
    favorites: { total: 420, percentage: 73 },
    toWatch: { total: 100, percentage: 18 },
  };

  return (
    <div>
      <div className={s.bannerContainer} ref={bannerRef}>
        <img className={s.banner} src={user.banner || defaultBanner} alt="Bannière" />
        <button className={s.changeBanner} onClick={() => handleImageChange('banner')}>
          <i className="fas fa-pencil-alt"></i>
        </button>
      </div>
      <div className={s.avatarContainer}>
        <img 
          className={s.avatar} 
          src={user.avatar || defaultAvatar} 
          alt="Avatar"
          // l'ajout de onError permet d'afficher l'image par défaut à la connexion (sans cet élément, seul le texte du "alt" s'affichait)
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = defaultAvatar;
          }} 
        />
        <button className={s.changeAvatar} onClick={() => handleImageChange('avatar')}>
          <i className="fas fa-pencil-alt"></i>
        </button>
      </div>
      <div className={s.bodyBubbles}>
        <div className={s.bubblesBackground}>
          <img ref={svgRef} src={ellipse} alt="ellipse animé floue" className={s.backgroundSvg} />
        </div>
        <h2 className={s.username}>{user.pseudo}</h2>
        <div className={s.progressSection}>
          <h3 className={s.collection}>Ma Collection</h3>
          <div className={s.progressBars}>
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
              label="Total Films/Séries notés" 
              total={progress.rated.total} 
            />
            <CircularProgressBar 
              percentage={progress.favorites.percentage} 
              label="Favoris" 
              total={progress.favorites.total} 
            />
            <CircularProgressBar 
              percentage={progress.toWatch.percentage} 
              label="À voir" 
              total={progress.toWatch.total} 
            />
          </div>
        </div>
      </div>
      <Sliders title="Tendances des films" items={trendingMovies} type="movie" />
      <Sliders title="Tendances des séries" items={trendingTVShows} type="tv" />
    </div>   
  );
};

export default UserProfile;
