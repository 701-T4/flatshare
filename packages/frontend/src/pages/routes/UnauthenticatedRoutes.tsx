import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import LandingPage from '../public/LandingPage';
import SignInPage from '../public/SignInPage';

interface UnauthenticatedRoutesProps {}

const UnauthenticatedRoutes: React.FC<UnauthenticatedRoutesProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<SignInPage />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
};

export default UnauthenticatedRoutes;
