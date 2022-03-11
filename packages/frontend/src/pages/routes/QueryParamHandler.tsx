import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAlert } from '../../components/common/util/CornerAlert';
import {
  getUrl,
  useApi,
  useApiMutation,
  useMutatingApi,
} from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

interface QueryParamHandlerProps {}

const QueryParamHandler: React.FC<QueryParamHandlerProps> = ({ children }) => {
  useJoinCode();

  return <>{children}</>;
};

// ?join
const useJoinCode = () => {
  const { createAlert } = useAlert();
  const { authLoaded, signedIn } = useAuth();
  const { data, loading } = useApi('/api/v1/user', { method: 'get' });

  // check if the url has a join code OR localstorage has a join code
  const [searchParams, setSearchParams] = useSearchParams();
  const inviteCode = searchParams.get('join') ?? '';

  const joinHouseMutation = useApiMutation('/api/v1/house', { method: 'put' });

  const joinHouse = (houseCode: string) => {
    joinHouseMutation({
      body: {
        houseCode,
      },
    });
  };

  useEffect(() => {
    if (!authLoaded) {
      return;
    }
    if (!signedIn) {
      // save to localstorage stuff
      localStorage.setItem('code', inviteCode);
      console.log('Stored');
      return;
    }

    if (loading) {
      return;
    }

    const joinCode = inviteCode ?? localStorage.get('join');

    if (!joinCode) {
      return;
    }

    localStorage.removeItem('join');
    searchParams.delete('join');
    setSearchParams(searchParams);

    if (data?.house) {
      createAlert(
        {
          icon: <ExclamationCircleIcon />,
          message: 'You can only be in one house at a time',
          mode: 'error',
        },
        3000,
      );
    } else {
      joinHouse(joinCode);
      console.log('1.');
    }

    // if (localStorage.getItem('code')) {
    //   localStorage.getItem('code');
    //   console.log('Retrieved Code');
    //   localStorage.removeItem('code');
    //   console.log('Removed Code');
    //   return;
    // } else if (data?.house) {
    //   joinHouse(joinCode);
    //   console.log('2.');
    //   return;
    // }
    return;

    // check for URL code or localstorage

    // join using that code
  }, [authLoaded, signedIn, data, loading]);
};

export default QueryParamHandler;
