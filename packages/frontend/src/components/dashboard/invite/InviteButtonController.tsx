import React, { useState } from 'react';
import ShareLinkModal from './ShareLinkModal';
import InviteButton from './InviteButton';
import { useApi } from '../../../hooks/useApi';

interface InviteButtonControllerProps {}

const InviteButtonController: React.FC<InviteButtonControllerProps> = () => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };

  const { data, loading } = useApi('/api/v1/house', { method: 'get' });

  return (
    <div>
      <InviteButton onClick={onClick} />
      <ShareLinkModal
        visible={visible}
        setVisible={setVisible}
        houseCode={data?.code}
        loading={loading}
      />
    </div>
  );
};

export default InviteButtonController;
