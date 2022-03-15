import React, { useState } from 'react';
import { useApi } from '../../../hooks/useApi';
import { Button, Spacer } from '@nextui-org/react';
import ShareLinkModal from '../../dashboard/invite/ShareLinkModal';
import WifiModal from './wifiModal';

interface NoteCardControllerProps {}

const NoteCardController: React.FC<NoteCardControllerProps> = () => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };

  // change to api call
  const getWifiNote = () => {
    return { 
      username: "alakazam", 
      password: "batman",
      loading: false
    };
  };
  const { username: username, loading: loading, password: password } = getWifiNote();

  return (
    <div>
      <Button onClick={onClick}>Wifi</Button>
      <Spacer y={0.5}/>
      <Button onClick={onClick}>Normal</Button>
      <Spacer y={0.5}/>
      <Button onClick={onClick}>Secret</Button>
      <Spacer y={0.5}/>
      <Button onClick={onClick}>Normal</Button>
      <WifiModal
        visible={visible}
        setVisible={setVisible}
        loading={loading}
        userName={username}
        password={password}
      />
    </div>
  );
};

export default NoteCardController;