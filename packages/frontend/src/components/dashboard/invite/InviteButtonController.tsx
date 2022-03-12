import React, { useState } from 'react';
import ShareLinkModal from '../../ShareLinkModal';
import InviteButton from './InviteButton';

interface InviteButtonControllerProps {}

const InviteButtonController: React.FC<InviteButtonControllerProps> = () => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };

  return (
    <div>
      <InviteButton onClick={onClick} />
      <ShareLinkModal visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default InviteButtonController;
