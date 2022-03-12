import React from 'react';
import Page from '../../components/common/layout/Page';
import QuickAccessPanel from '../../components/dashboard/QuickAccessPanel';
import GradientUnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import { useAuth } from '../../hooks/useAuth';

interface DashboardProps {}

const DashboardPage: React.FC<DashboardProps> = () => {
  const { user } = useAuth();
  return (
    <Page>
      <GradientUnderlinedText>
        <div className="text-lg font-medium">
          <span className="text-teal-500 font-semibold">{'Welcome'}</span>
          {', '}
          {user?.displayName}
        </div>
      </GradientUnderlinedText>
      <QuickAccessPanel />
      <GradientUnderlinedText>
        <div className="text-lg font-medium">
          <span className="text-teal-500 font-semibold">{'Upcoming'}</span>
          <span>{' Tasks'}</span>
        </div>
      </GradientUnderlinedText>
    </Page>
  );
};

export default DashboardPage;
