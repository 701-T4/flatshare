import React, { useState } from 'react';
import { Button, Spacer } from '@nextui-org/react';
import WifiModal from './wifiModal';
import PlainModal from './plainModal';
import SecretModal from './secretModal';
import NotesModal from './NotesGrid';

interface NoteCardControllerProps {}

const NoteCardController: React.FC<NoteCardControllerProps> = () => {
  const [wifivisible, setWifiVisible] = useState(false);
  const [secretvisible, setSecretVisible] = useState(false);
  const [plainvisible, setPlainVisible] = useState(false);
  const [qrCodeText, setQrCodeText] = useState('');
  const [qrvisible, setQRVisible] = useState(false);

  const onClickWifi = () => {
    setWifiVisible(true);
  };
  const onClickSecret = () => {
    setSecretVisible(true);
  };
  const onClickPlain = () => {
    setPlainVisible(true);
  };

  // change to api call
  const getWifiNote = () => {
    return {
      username: 'alakazam',
      password: 'batman',
      encryption: 'WEP',
      loading: false,
    };
  };
  const {
    username: username,
    loading: loading,
    password: password,
    encryption: encryption,
  } = getWifiNote();

  const getPlainandSecretNote = () => {
    return {
      loading: false,
      data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum leo tellus, viverra vitae fermentum vitae, mollis laoreet tortor. Donec mattis velit sit amet mauris laoreet porttitor. Vestibulum sem ante, consequat in risus nec, pellentesque gravida lectus. Duis ornare scelerisque risus. Duis blandit pellentesque dolor vel sodales. Proin rutrum, purus ac varius tristique, leo mauris suscipit mauris, nec pellentesque lorem enim eu nunc. Pellentesque fringilla augue non massa cursus, at ultricies arcu porta. Mauris at felis ultrices quam elementum rhoncus. Etiam in risus auctor, tristique felis quis, rutrum odio. Pellentesque nulla nibh, ornare sit amet ultricies eu, convallis eu diam. Phasellus sed pellentesque mi, vel dapibus nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    };
  };
  const { data: data, loading: loading1 } = getPlainandSecretNote();

  const getNotes = () => {
    return {
      list: [
        {
          title: 'Orange',
          type: 'Secret',
          desc: 'I don\'t know what the contents of description is, so I\'m just ramdomly type something.',
        },
        {
          title: 'Hello',
          type: 'Normal',
          desc: 'I don\'t know what the contents of description is, so I\'m just ramdomly type something.',
        },
        {
          title: 'Hello',
          type: 'Normal',
          desc: 'I don\'t know what the contents of description is, so I\'m just ramdomly type something.',
        },
        {
          title: 'Hello',
          type: 'Normal',
          desc: 'I don\'t know what the contents of description is, so I\'m just ramdomly type something.',
        },
        {
          title: 'Hello',
          type: 'Wifi',
          desc: 'I don\'t know what the contents of description is, so I\'m just ramdomly type something.',
        },
        {
          title: 'Hello',
          type: 'Normal',
          desc: 'I don\'t know what the contents of description is, so I\'m just ramdomly type something.',
        },
        {
          title: 'Hello',
          type: 'Normal',
          desc: 'I don\'t know what the contents of description is, so I\'m just ramdomly type something.',
        },
        {
          title: 'Hello',
          type: 'Plain',
          desc: 'I don\'t know what the contents of description is, so I\'m just ramdomly type something.',
        },
      ],
    };
  };
  const { list: list } = getNotes();

  return (
    <div>
      <NotesModal Notes={list} />
      <Button onClick={onClickWifi}>Wifi</Button>
      <Spacer y={0.5} />
      <Button onClick={onClickPlain}>Plain</Button>
      <Spacer y={0.5} />
      <Button onClick={onClickSecret}>Secret</Button>
      <Spacer y={0.5} />
      <Button onClick={onClickPlain}>Plain</Button>
      <WifiModal
        visible={wifivisible}
        setVisible={setWifiVisible}
        setQrCodeText={setQrCodeText}
        qrCodeText={qrCodeText}
        loading={loading}
        userName={username}
        password={password}
        encryption={encryption}
        qrvisible={qrvisible}
        setQRVisible={setQRVisible}
      />
      <PlainModal
        visible={plainvisible}
        setVisible={setPlainVisible}
        loading={loading1}
        data={data}
      />
      <SecretModal
        visible={secretvisible}
        setVisible={setSecretVisible}
        loading={loading1}
        data={data}
      />
    </div>
  );
};

export default NoteCardController;
