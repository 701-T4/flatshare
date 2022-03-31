import React, { useState } from 'react';
import { Text, Grid, Card } from '@nextui-org/react';
import WifiModal from './wifiModal';
import PlainModal from './plainModal';
import SecretModal from './secretModal';

interface NotesGridProps {
  Notes:
    | {
        name: string;
        value: string;
        type: string;
        house: { [key: string]: unknown };
      }[]
    | undefined;
}

const NotesGrid: React.FC<NotesGridProps> = ({ Notes }) => {
  const [plainvisible, setPlainVisible] = useState(false);
  const [secretvisible, setSecretVisible] = useState(false);
  const [wifivisible, setWifiVisible] = useState(false);
  const [wifipass, setWifiPass] = useState('');
  const [wifiuser, setWifiUser] = useState('');
  const [activeName, setActiveName] = useState('');
  const [activeValue, setActiveValue] = useState('');
  const [qrCodeText, setQrCodeText] = useState('');
  const [qrvisible, setQRVisible] = useState(false);
  const [loading] = useState(false);
  const onClickCard = (item: any) => {
    // NEED TO CHANGE SO TYPES WORK PROPERLY
    switch (item.type) {
      case 'PLAIN':
        setPlainVisible(true);
        break;
      case 'SECRET':
        setSecretVisible(true);
        break;
      case 'WIFI':
        setWifiUser(item.value.substring(0, item.value.indexOf(':')));
        setWifiPass(item.value.substring(item.value.indexOf(':') + 1));
        setWifiVisible(true);
        break;
    }
  };

  return (
    <div>
      <PlainModal
        visible={plainvisible}
        setVisible={setPlainVisible}
        loading={loading}
        data={activeValue}
        title={activeName}
      />

      <WifiModal
        visible={wifivisible}
        setVisible={setWifiVisible}
        setQrCodeText={setQrCodeText}
        qrCodeText={qrCodeText}
        loading={loading}
        userName={wifiuser}
        password={wifipass}
        encryption={'L'}
        qrvisible={qrvisible}
        setQRVisible={setQRVisible}
      />

      <SecretModal
        visible={secretvisible}
        setVisible={setSecretVisible}
        loading={loading}
        data={activeValue}
      />

      <Grid.Container gap={2} justify="center">
        {Notes?.map((item, index) => (
          <Grid xs={18} md={6} sm={6} key={index}>
            <Card
              color="secondary"
              hoverable
              clickable
              onClick={(event) => {
                setActiveName(item.name);
                setActiveValue(item.value);
                onClickCard(item);
              }}
            >
              <Text color="black" size={30} weight="semibold">
                {item.name}
              </Text>
              <Text
                color="primary"
                size={14}
                transform="uppercase"
                weight="semibold"
              >
                {item.type}
              </Text>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </div>
  );
};

export default NotesGrid;
