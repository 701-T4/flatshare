import { ExclamationCircleIcon } from '@heroicons/react/solid';
import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAlert } from '../../components/common/util/CornerAlert';
import { useAuth } from '../../hooks/useAuth';

interface QueryParamHandlerProps {}

const QueryParamHandler: React.FC<QueryParamHandlerProps> = ({ children }) => {
  useJoinCode();
  return <>{children}</>;
};

// ?join
const useJoinCode = () => {
  const { createAlert } = useAlert();
  const { signedIn } = useAuth();

  // check if the url has a join code OR localstorage has a join code
  const [searchParams] = useSearchParams();
  const urlJoinCode = useMemo(
    () => searchParams.get('join') ?? '',
    [searchParams],
  );

  useEffect(() => {
    if (urlJoinCode) {
      localStorage.setItem('joinCode', urlJoinCode);
      if (!signedIn) {
        createAlert(
          {
            icon: <ExclamationCircleIcon />,
            message: 'Please sign in first.',
            mode: 'warning',
          },
          3000,
        );
      }
    }
  }, [urlJoinCode, signedIn, createAlert]);
};

export default QueryParamHandler;
