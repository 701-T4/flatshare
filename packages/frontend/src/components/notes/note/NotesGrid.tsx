import React, { useState } from 'react';
import { Text, Grid, Card } from '@nextui-org/react';
import WifiModal from './wifiModal';
import PlainModal from './plainModal';
import SecretModal from './secretModal';

interface NotesGridProps {
  notes:
    | {
        id: string;
        name: string;
        value: string;
        type: string;
        house: { [key: string]: unknown };
      }[]
    | undefined;
}

const NotesGrid: React.FC<NotesGridProps> = ({ notes }) => {
  const [plainvisible, setPlainVisible] = useState(false);
  const [secretvisible, setSecretVisible] = useState(false);
  const [wifivisible, setWifiVisible] = useState(false);
  const [activeName, setActiveName] = useState('');
  const [activeValue, setActiveValue] = useState('');
  const [activeId, setActiveId] = useState('');
  const [qrCodeText, setQrCodeText] = useState('');
  const [qrvisible, setQRVisible] = useState(false);
  const [loading] = useState(false);

  const onClickCard = (item: any) => {
    switch (item.type) {
      case 'PLAIN':
        setPlainVisible(true);
        break;
      case 'SECRET':
        setSecretVisible(true);
        break;
      case 'WIFI':
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
        value={activeValue}
        setValue={setActiveValue}
        title={activeName}
        setTitle={setActiveName}
        id={activeId}
      />

      <WifiModal
        visible={wifivisible}
        setVisible={setWifiVisible}
        setQrCodeText={setQrCodeText}
        qrCodeText={qrCodeText}
        loading={loading}
        value={activeValue}
        setValue={setActiveValue}
        encryption={'L'}
        qrvisible={qrvisible}
        setQRVisible={setQRVisible}
        title={activeName}
        setTitle={setActiveName}
        id={activeId}
      />

      <SecretModal
        visible={secretvisible}
        setVisible={setSecretVisible}
        loading={loading}
        value={activeValue}
        setValue={setActiveValue}
        title={activeName}
        setTitle={setActiveName}
        id={activeId}
      />

      <Grid.Container gap={2} justify="flex-start">
        {notes?.map((item, index) => (
          <Grid xs={18} md={6} sm={6} key={index}>
            <Card
              color="secondary"
              css={{
                backgroundColor: '#1D2530',
              }}
              className="border-none shadow-md hover:shadow-sm"
              shadow={false}
              clickable
              onClick={(event) => {
                setActiveName(item.name);
                setActiveValue(item.value);
                setActiveId(item.id);
                onClickCard(item);
              }}
            >
              <h1 className="py-1 text-2xl font-semibold text-white">
                {item.name}
              </h1>
              <p className="pb-1 text-sm font-medium tracking-normal text-teal-400 uppercase">
                {item.type}
              </p>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </div>
  );
};

export default NotesGrid;
