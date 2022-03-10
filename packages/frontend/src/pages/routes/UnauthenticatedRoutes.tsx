import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import ManageAccountPage from '../public/ManageAccountPage';
import HomePage from '../public/HomePage';
import LandingPage from '../public/LandingPage';
import SignInPage from '../public/SignInPage';
import CreateHousePage from '../public/CreateHousePage';

interface UnauthenticatedRoutesProps {}

const UnauthenticatedRoutes: React.FC<UnauthenticatedRoutesProps> = () => {
  return (
    <Routes>
      <Route path="auth" element={<SignInPage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="account" element={<ManageAccountPage />} />
      <Route path="create" element={<CreateHousePage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
      <Route path="landing" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
};

export default UnauthenticatedRoutes;
