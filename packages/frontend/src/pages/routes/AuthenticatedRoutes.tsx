import React from 'react';
import { Routes } from 'react-router';
import { Navigate, Route } from 'react-router-dom';
import HomePage from '../public/HomePage';
import CreateHousePage from '../public/CreateHousePage';
import ManageAccountPage from '../public/ManageAccountPage';

interface AuthenticatedRoutesProps {}

const AuthenticatedRoutes: React.FC<AuthenticatedRoutesProps> = () => {
  return (
    <Routes>
      <Route path="home" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
      <Route path="account" element={<ManageAccountPage />} />
      <Route path="create" element={<CreateHousePage />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
