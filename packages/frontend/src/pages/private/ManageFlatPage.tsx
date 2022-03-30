import React, { useCallback, useMemo, useState } from 'react';
import Page from '../../components/common/layout/Page';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import { useHouse } from '../../hooks/useHouse';
import { useAuth } from '../../hooks/useAuth';
import HouseSettings from '../../components/manage/HouseSettings';

interface ManageFlatPageProps {}

const ManageFlatPage: React.FC<ManageFlatPageProps> = () => {
  const house = useHouse();
  const { user } = useAuth();

  console.log('house', house);
  console.log('user', user);

  return (
    <Page>
      <div className="flex flex-col gap-4">
        <UnderlinedText colorClasses="bg-gray-800">
          <div className="text-lg font-semibold">
            {house.name || 'Your Flat'}
          </div>
        </UnderlinedText>
        <HouseSettings
          ownerView={true}
          houseName={house.name || 'Your Flat'}
          totalRent={house.rent}
          maxNumOccupants={house.maxOccupants}
          address={house.address}
          ownerContactNum={house.email}
          onUpdateHouse={() => {}}
        />

        <UnderlinedText className="pt-10" colorClasses="bg-gray-800">
          <div className="text-lg font-semibold">Past Bills</div>
        </UnderlinedText>
      </div>
    </Page>
  );
};

export default ManageFlatPage;
