import React from 'react';
import { Routes } from 'react-router';
import { Navigate, Route } from 'react-router-dom';
import { HouseContextProvider } from '../../hooks/useFlat';
import DashboardPage from '../private/DashboardPage';
import ManageAccountPage from '../private/ManageAccountPage';

interface AuthenticatedRoutesProps {}

const AuthenticatedRoutes: React.FC<AuthenticatedRoutesProps> = () => {
  return (
    <Routes>
      <Route path="account" element={<ManageAccountPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

const withContexts = (WrappedComponent: React.ComponentType) => {
  const hoc = ({ ...props }) => (
    <HouseContextProvider>
      <WrappedComponent {...props} />
    </HouseContextProvider>
  );

  return hoc;
};

export default withContexts(AuthenticatedRoutes);
