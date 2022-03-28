import React, { useCallback, useMemo, useState } from 'react';
import Page from '../../components/common/layout/Page';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import { useHouse } from '../../hooks/useHouse';

interface ManageFlatPageProps {}

const ManageFlatPage: React.FC<ManageFlatPageProps> = () => {
  const house = useHouse();
  console.log(house);

  return (
    <Page>
      <div className="flex flex-col gap-4">
        <UnderlinedText colorClasses="bg-gray-800">
          <div className="text-lg font-semibold">
            {house.name || 'Your Flat'}
          </div>
        </UnderlinedText>

        <UnderlinedText className="pt-10" colorClasses="bg-gray-800">
          <div className="text-lg font-semibold">Past Bills</div>
        </UnderlinedText>
      </div>
    </Page>
  );
};

export default ManageFlatPage;
