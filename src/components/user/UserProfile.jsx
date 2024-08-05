// src/components/UserProfile.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/authSlice';

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleImageChange = (type, imageUrl) => {
    dispatch(updateProfile({ [type]: imageUrl }));
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
        <img src={user.banner || 'default-banner.jpg'} alt="Bannière" />
        <button onClick={() => handleImageChange('banner', 'new-banner-url.jpg')}>
          Changer la bannière
        </button>
      </div>
      <div>
        <img src={user.avatar || 'default-avatar.png'} alt="Avatar" />
        <button onClick={() => handleImageChange('avatar', 'new-avatar-url.jpg')}>
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