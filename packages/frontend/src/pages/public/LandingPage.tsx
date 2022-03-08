import React from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
  const { data } = useApi('/api/v1/ping', {
    method: 'get',
  });
  if (data) {
    const { env, time } = data;
    console.log({ env, time });
  }

  return (
    <div>
      Landing
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <Link to="/auth">Login with Google</Link>
      </button>
    </div>
  );
};

export default LandingPage;
