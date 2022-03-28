import React, { useCallback, useMemo, useState } from 'react';
import Page from '../../components/common/layout/Page';

interface ManageFlatPageProps {}

const ManageFlatPage: React.FC<ManageFlatPageProps> = () => {
  return (
    <Page>
      <div className="flex flex-col gap-4"></div>
    </Page>
  );
};

export default ManageFlatPage;
