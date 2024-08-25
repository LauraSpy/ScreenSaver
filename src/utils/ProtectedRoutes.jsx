import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// Composant ProtectedRoutes pour gérer l'accès aux routes protégées
const ProtectedRoutes = () => {
  // Utilisation de useSelector pour accéder à l'état d'authentification dans le store Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Rendu conditionnel basé sur l'état d'authentification
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;