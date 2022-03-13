import React from 'react';
import { Routes } from 'react-router';
import { Navigate, Route } from 'react-router-dom';
import { useLocalStorageJoinCode } from '../../components/common/util/useLocalStorageJoinCode';
import useFullLoader from '../../hooks/useFullLoader';
import { HouseContextProvider, useHouse } from '../../hooks/useHouse';
import DashboardPage from '../private/DashboardPage';
import ManageAccountPage from '../private/ManageAccountPage';

interface AuthenticatedRoutesProps {}

const AuthenticatedRoutes: React.FC<AuthenticatedRoutesProps> = () => {
  const { name, dataLoading } = useHouse();

  useLocalStorageJoinCode();
  useFullLoader(() => !!dataLoading);

  if (!name) {
    return (
      <Routes>
        <Route path="account" element={<ManageAccountPage />} />
        <Route path="*" element={<Navigate to="/account" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
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
