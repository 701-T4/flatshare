import React, { useCallback, useEffect } from 'react';
import { Routes } from 'react-router';
import { Navigate, Route } from 'react-router-dom';
import useFullLoader from '../../hooks/useFullLoader';
import { HouseContextProvider, useHouse } from '../../hooks/useHouse';
import DashboardPage from '../private/DashboardPage';
import ManageAccountPage from '../private/ManageAccountPage';
import BillSplittingPage from '../private/BillSplittingPage';
import BillDetailPage from '../private/BillDetailPage';
import NotesPage from '../private/NotesPage';
import IssuesPage from '../private/IssuesPage';
import IssueDetailPage from '../private/IssueDetailPage';
import { useApiMutation } from '../../hooks/useApi';
import { useAlert } from '../../components/common/util/CornerAlert';
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import AnnouncementPage from '../private/AnnouncementPage';

interface AuthenticatedRoutesProps {}

const AuthenticatedRoutes: React.FC<AuthenticatedRoutesProps> = () => {
  const { name, dataLoading, refetchHouse } = useHouse();

  useFullLoader(() => !!dataLoading);
  const joinHouseMutation = useApiMutation('/api/v1/house', { method: 'put' });

  const clearJoinCode = useCallback(() => {
    localStorage.removeItem('joinCode');
  }, []);

  const { createAlert } = useAlert();

  // handle join code
  useEffect(() => {
    (async () => {
      if (dataLoading) {
        return;
      }

      const joinCode = localStorage.getItem('joinCode');
      if (!joinCode) {
        return;
      }

      if (name) {
        createAlert(
          {
            icon: <ExclamationCircleIcon />,
            message: 'You can only be in one house at a time',
            mode: 'error',
          },
          3000,
        );
        clearJoinCode();
        return;
      }

      clearJoinCode();

      createAlert(
        {
          icon: <InformationCircleIcon />,
          message: 'Joining the house...',
          mode: 'info',
        },
        3000,
      );

      await joinHouseMutation({
        body: { houseCode: joinCode },
      });

      await refetchHouse();
    })();
  }, [
    dataLoading,
    name,
    clearJoinCode,
    joinHouseMutation,
    refetchHouse,
    createAlert,
  ]);

  if (dataLoading) {
    return null;
  }

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
      <Route path="bills">
        <Route index element={<BillSplittingPage />} />
        <Route path=":id" element={<BillDetailPage />} />
      </Route>
      <Route path="notes">
        <Route index element={<NotesPage />} />
      </Route>
      <Route path="issues">
        <Route index element={<IssuesPage />} />
        <Route path=":id" element={<IssueDetailPage />} />
      </Route>
      <Route path="announcement">
        <Route index element={<AnnouncementPage />} />
      </Route>
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
