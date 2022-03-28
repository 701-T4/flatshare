import React from 'react';
import OccupantPanel from '../../components/manage/OccupantPanel';

const occupantsData = [
  {
    name: 'Occupant name 1',
    _id: 'ajswiofjawe',
    contact: '0221238947',
    percentageOfRent: 23.23,
    dateJoined: '2000-12-12',
    contractEndDate: '2000-1-1',
  },
  {
    name: 'Occupant name 2',
    _id: 'awefoiajweofijawef',
    contact: '02223898923',
    percentageOfRent: 73.24,
    dateJoined: '2001-12-12',
    contractEndDate: '2012-1-1',
  },
];

interface ManageFlatPageProps {}
const ManageFlatPage: React.FC<ManageFlatPageProps> = () => {
  return (
    <div>
      <OccupantPanel
        config={{ totalRent: 4000, ownerView: true }}
        cards={occupantsData}
      />
    </div>
  );
};

export default ManageFlatPage;
