// src/components/UserProfile.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/authSlice';
import defaultBanner from '../../images/banner/banner-default.png';
import defaultAvatar from '../../images/avatar/avatar-default.png';
import banner1 from '../../images/banner/banner1.jpg';
import banner2 from '../../images/banner/banner2.jpg';
import avatar1 from '../../images/avatar/avatar1.jpg';
import avatar2 from '../../images/avatar/avatar2.jpg';
import s from './styles.module.css';

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [bannerOptions] = useState([defaultBanner, banner1, banner2]);
  const [avatarOptions] = useState([defaultAvatar, avatar1, avatar2]);

  const handleImageChange = (type) => {
    const options = type === 'banner' ? bannerOptions : avatarOptions;
    const currentIndex = options.indexOf(user[type] || options[0]);
    const nextIndex = (currentIndex + 1) % options.length;
    const newImage = options[nextIndex];
    dispatch(updateProfile({ [type]: newImage }));
  };

  // Simuler des données de progression
  const progress = {
    moviesWatched: 50,
    seriesWatched: 30,
    rated: 40,
    favorites: 20,
    toWatch: 60,
  };

  return (
    <div>
      <div>
        <img src={user.banner || defaultBanner} alt="Bannière" style={{width: '100%', height: '55vh', objectFit: 'cover'}} />
        <button onClick={() => handleImageChange('banner')}>
          Changer la bannière
        </button>
      </div>
      <div>
        <img src={user.avatar || defaultAvatar} alt="Avatar" style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%'}} />
        <button onClick={() => handleImageChange('avatar')}>
          Changer l'avatar
        </button>
      </div>
      <h2>{user.pseudo}</h2>
      <div>
        <h3>Progression</h3>
        <div>Films regardés: {progress.moviesWatched}%</div>
        <div>Séries regardées: {progress.seriesWatched}%</div>
        <div>Films/Séries notés: {progress.rated}%</div>
        <div>Favoris: {progress.favorites}%</div>
        <div>À voir: {progress.toWatch}%</div>
      </div>
    </div>
  );
};

export default UserProfile;