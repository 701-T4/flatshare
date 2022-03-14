import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../../hooks/useAuth';
import { useIsLoading } from '../../hooks/useFullLoader';
import LoaderPage from '../public/LoaderPage';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import UnauthenticatedRoutes from './UnauthenticatedRoutes';

interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
  const { signedIn, authLoaded } = useAuth();

  const { loadingCount } = useIsLoading();

  const displayLoading = useMemo(
    () => loadingCount !== 0 || !authLoaded,
    [loadingCount, authLoaded],
  );

  return (
    <>
      {displayLoading ? createPortal(<LoaderPage />, document.body) : <></>}{' '}
      {signedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
    </>
  );
};

export default Router;
