import React, { useCallback, useMemo, useState } from 'react';
import Page from '../../components/common/layout/Page';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import { useHouse } from '../../hooks/useHouse';
import { useAuth } from '../../hooks/useAuth';
import HouseSettings from '../../components/manage/HouseSettings';
import OccupantPanel from '../../components/manage/OccupantPanel';
import { OccupantCardProps } from '../../components/manage/OccupantCard';
import LoaderPage from '../public/LoaderPage';

interface ManageFlatPageProps {}

const ManageFlatPage: React.FC<ManageFlatPageProps> = () => {
  const house = useHouse();
  const { user } = useAuth();

  console.log('house', house);
  console.log('user', user);

  return (
    <Page>
      {house.dataLoading ? (
        <LoaderPage />
      ) : (
        <div className="flex flex-col gap-4">
          <UnderlinedText colorClasses="bg-gray-800">
            <div className="text-lg font-semibold">
              {house.name || 'Your Flat'}
            </div>
          </UnderlinedText>
          <HouseSettings
            ownerView={user?.uid === house.owner}
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
          <OccupantPanel
            cards={
              house.users
                ? house.users?.map((u) => {
                    return {
                      name: u.name,
                      firebaseId: u.firebaseId,
                      contact: u.contact,
                      rentPercentage: u.rentPercentage,
                      dateJoined: u.dateJoined,
                      contractEndingDate: u.contractEndingDate,
                    };
                  })
                : []
            }
            ownerView={user?.uid === house.owner}
            totalRent={house.rent || 0}
            onSaveOccupant={() => {}}
            onDeleteOccupant={() => {}}
          />
        </div>
      )}
    </Page>
  );
};

export default ManageFlatPage;
