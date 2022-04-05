import React from 'react';
import Page from '../../components/common/layout/Page';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import { useHouse } from '../../hooks/useHouse';
import { useAuth } from '../../hooks/useAuth';
import HouseSettings from '../../components/manage/HouseSettings';
import OccupantPanel from '../../components/manage/OccupantPanel';
import { OccupantCardProps } from '../../components/manage/OccupantCard';
import LoaderPage from '../public/LoaderPage';
import { useApiMutation } from '../../hooks/useApi';
import { components } from '../../types/api-schema';
import { HouseSettingsProps } from '../../components/manage/HouseSettings';

interface ManageFlatPageProps {}

/**
 * This is the page of the application that allows the user to
 * manage their flat. It is connected from the dashbaord via
 * the "Manage Flat" card
 */
const ManageFlatPage: React.FC<ManageFlatPageProps> = () => {
  const house = useHouse();
  const { user } = useAuth();

  /**
   * Used for updating the house settings. Only accessibly by the
   * house owner.
   */
  const saveHouseInfo = useApiMutation('/api/v1/house/update', {
    method: 'put',
  });

  /**
   * Used for updating the information of a single occupant of the house.
   * This is also used for deleting occupants from the house.
   */
  const updateOccupantInfo = useApiMutation('/api/v1/user', {
    method: 'put',
  });

  const onSaveHouseInfo = async (data: HouseSettingsProps) => {
    const newData: components['schemas']['UpdateHouseDto'] = {
      // House code is use to identify the flat to be updated in the backend
      code: house.code!,
      address: data.address,
      name: data.houseName,
      maxOccupants: data.maxNumOccupants,
      email: data.ownerContactNum,
      rent: data.totalRent,
    };
    await saveHouseInfo({ body: newData });
    window.location.reload();
  };

  const onSaveOccupants = async (occupantDetails: OccupantCardProps) => {
    const newData: components['schemas']['UpdateUserDto'] = {
      house: house.code!,
      firebaseId: occupantDetails.firebaseId!,
      name: occupantDetails.name,
      rentPercentage: occupantDetails.rentPercentage,
      contact: occupantDetails.contact,
      dateJoined: occupantDetails.dateJoined?.toDateString(),
      contractEndingDate: occupantDetails.contractEndingDate?.toDateString(),
    };

    await updateOccupantInfo({ body: newData });
    window.location.reload();
  };

  const onDeleteOccupant = async (firebaseId: string) => {
    if (!house || !house.users) {
      console.log('Cannot access house, or users');
      return;
    }

    await saveHouseInfo({
      body: {
        code: house.code!,
        users: house.users
          .map((user) => user.firebaseId)
          .filter((id) => id !== firebaseId),
      },
    });
    window.location.reload();
  };

  return (
    <Page backpath="/dashboard">
      {house.dataLoading ? (
        <LoaderPage />
      ) : (
        <div className="flex flex-col gap-4">
          <UnderlinedText className="text-teal-500 " colorClasses="bg-gray-800">
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
            onUpdateHouse={onSaveHouseInfo}
          />

          <UnderlinedText
            className="pt-10 text-teal-500 "
            colorClasses="bg-gray-800"
          >
            <div className="text-lg font-semibold">Occupants</div>
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
                      dateJoined: u.dateJoined
                        ? new Date(u.dateJoined)
                        : undefined,
                      contractEndingDate: u.contractEndingDate
                        ? new Date(u.contractEndingDate)
                        : undefined,
                      isOwner: u.firebaseId === house.owner,
                    };
                  })
                : []
            }
            ownerView={user?.uid === house.owner}
            totalRent={house.rent || 0}
            onSaveOccupant={onSaveOccupants}
            onDeleteOccupant={onDeleteOccupant}
          />
        </div>
      )}
    </Page>
  );
};

export default ManageFlatPage;
