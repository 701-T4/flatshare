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
      {/* TODO: match with backend (currently works for /join?code=XXXX) */}
      <Route path="join" element={<SignInPage />} />
      {/* <Route path="join=:houseCode" element={<HomePage alreadyInFlat={alreadyInFlat}/>} /> */}
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
};

export default UnauthenticatedRoutes;
