import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useApiMutation } from '../../../hooks/useApi';
import { useHouse } from '../../../hooks/useHouse';
import { useAlert } from './CornerAlert';
import { useLocalStorage } from './useLocalStorage';

export const useLocalStorageJoinCode = () => {
  const { name, dataLoading } = useHouse();
  const { createAlert, resetAlert } = useAlert();
  const joinHouseMutation = useApiMutation('/api/v1/house', { method: 'put' });
  const navigate = useNavigate();

  const clearJoinCode = useCallback(() => {
    localStorage.removeItem('joinCode');
  }, []);

  useLocalStorage(
    'joinCode',
    async (houseCode) => {
      // only run if the house has loaded, and a code is in local-storage.
      if (houseCode && !dataLoading) {
        if (name) {
          createAlert(
            {
              icon: <ExclamationCircleIcon />,
              message: 'You can only be in one house at a time',
              mode: 'error',
            },
            3000,
          );
          return clearJoinCode();
        }
        console.log('RUN2', { name });
        createAlert({
          icon: <InformationCircleIcon />,
          message: 'Joining the house...',
          mode: 'info',
        });
        await joinHouseMutation({
          body: { houseCode },
        });
        navigate('/dashboard');
        resetAlert();
        clearJoinCode();
      }
    },
    [dataLoading],
  );
};
