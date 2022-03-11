import React from 'react';
import { Routes } from 'react-router';
import { Navigate, Route } from 'react-router-dom';
import HomePage from '../public/HomePage';
import LandingPage from '../public/LandingPage';

interface AuthenticatedRoutesProps {
  alreadyInFlat: boolean;
}

const AuthenticatedRoutes: React.FC<AuthenticatedRoutesProps> = ({
  alreadyInFlat,
}: AuthenticatedRoutesProps) => {
  return (
    <Routes>
      <Route path="landing" element={<LandingPage />} />
      <Route path="join" element={<HomePage alreadyInFlat={alreadyInFlat} />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
