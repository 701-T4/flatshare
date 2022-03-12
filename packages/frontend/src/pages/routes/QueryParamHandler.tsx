import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAlert } from '../../components/common/util/CornerAlert';
import { getUrl, useApi, useApiMutation } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { auth } from '../../services/firebase';

interface QueryParamHandlerProps {}

const QueryParamHandler: React.FC<QueryParamHandlerProps> = ({ children }) => {
  useJoinCode();
  return <>{children}</>;
};

// ?join
const useJoinCode = () => {
  const { createAlert } = useAlert();
  const { signedIn } = useAuth();
  const { data, loading, error } = useApi('/api/v1/user', { method: 'get' });

  // check if the url has a join code OR localstorage has a join code
  const [searchParams, setSearchParams] = useSearchParams();
  const urlJoinCode = searchParams.get('join') ?? '';

  const joinHouseMutation = useApiMutation('/api/v1/house', { method: 'put' });

  useEffect(() => {
    if (urlJoinCode) {
      localStorage.setItem('joinCode', urlJoinCode);
    }
  }, [urlJoinCode]);

  useEffect(() => {
    const joinHouse = (houseCode: string) => {
      joinHouseMutation({
        body: { houseCode },
      });
    };

    const clearParam = () => {
      localStorage.removeItem('joinCode');
      searchParams.delete('joinCode');
      setSearchParams(searchParams);
    };

    const joinCode = localStorage.getItem('joinCode');

    if (!signedIn || loading || error || !joinCode) {
      return;
    }

    if (data?.house) {
      createAlert(
        {
          icon: <ExclamationCircleIcon />,
          message: 'You can only be in one house at a time',
          mode: 'error',
        },
        3000,
      );
      clearParam();
      return;
    }

    joinHouse(joinCode);
    clearParam();
  }, [
    urlJoinCode,
    signedIn,
    loading,
    error,
    data,
    joinHouseMutation,
    searchParams,
    setSearchParams,
    createAlert,
  ]);
};

export default QueryParamHandler;
