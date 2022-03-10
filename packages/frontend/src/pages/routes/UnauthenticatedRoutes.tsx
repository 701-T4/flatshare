import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../public/LandingPage';
import SignInPage from '../public/SignInPage';
import HomePage from '../public/HomePage';

interface UnauthenticatedRoutesProps {
  alreadyInFlat: boolean;
}

const UnauthenticatedRoutes: React.FC<UnauthenticatedRoutesProps> = ({
  alreadyInFlat,
}: UnauthenticatedRoutesProps) => {
  return (
    <Routes>
      <Route path="auth" element={<SignInPage />} />
      <Route path="landing" element={<LandingPage />} />
      <Route path="home" element={<HomePage alreadyInFlat={alreadyInFlat} />} />
      {/* TODO: match with backend (currently works for /join?code=XXXX) */}
      <Route path="join" element={<SignInPage />} />
      {/* <Route path="join=:houseCode" element={<HomePage alreadyInFlat={alreadyInFlat}/>} /> */}
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
};

export default UnauthenticatedRoutes;
