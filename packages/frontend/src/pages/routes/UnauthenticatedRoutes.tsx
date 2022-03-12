import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../public/LandingPage';
import SignInPage from '../public/SignInPage';
import HomePage from '../public/HomePage';

interface UnauthenticatedRoutesProps {}

const UnauthenticatedRoutes: React.FC<UnauthenticatedRoutesProps> = () => {
  return (
    <Routes>
      <Route path="auth" element={<SignInPage />} />
      <Route path="landing" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
};

export default UnauthenticatedRoutes;
