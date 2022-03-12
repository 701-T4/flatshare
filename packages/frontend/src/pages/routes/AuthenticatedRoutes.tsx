import React from 'react';
import { Routes } from 'react-router';
import { Navigate, Route } from 'react-router-dom';
import DashboardPage from '../private/DashboardPage';
import HomePage from '../public/HomePage';
import LandingPage from '../public/LandingPage';

interface AuthenticatedRoutesProps {}

const AuthenticatedRoutes: React.FC<AuthenticatedRoutesProps> = () => {
  return (
    <Routes>
      <Route path="home" element={<HomePage />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
