import { EyeIcon, QrcodeIcon } from '@heroicons/react/outline';
import { WifiIcon } from '@heroicons/react/solid';
import {
  Avatar,
  Button,
  Container,
  Input,
  Modal,
  Spacer,
  Text,
} from '@nextui-org/react';
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import EditButton from './editButton';
import { NoteTypes } from './noteCardController';

interface WifiModalProps {
  visible: boolean;
  setVisible(value: boolean): void;
  setQrCodeText(value: string): void;
  loading: boolean;
  value: string;
  setValue(value: string): void;
  encryption: string;
  qrCodeText: string;
  qrvisible: boolean;
  title: string;
  setTitle(value: string): void;
  id: string;
  setQRVisible(value: boolean): void;
}

const WifiModal: React.FC<WifiModalProps> = ({
  visible,
  setVisible,
  setQrCodeText,
  loading,
  value,
  setValue,
  encryption,
  qrCodeText,
  qrvisible,
  setQRVisible,
  title,
  setTitle,
  id,
}) => {
  const closeHandler = () => {
    setVisible(false);
    setQRVisible(false);
    setPasswordShown(false);
  };

  const qrCodeHandler = (e: any) => {
    e.preventDefault();
    setQRVisible(!qrvisible);
    setQrCodeText(
      `WIFI:T:${encryption};S:${value.substring(0, value.indexOf(':'))};${
        encryption !== 'nopass'
          ? `P:${value.substring(value.indexOf(':') + 1)};`
          : ''
      }`,
    );
    return false;
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const passwordHandler = () => {
    setPasswordShown(!passwordShown);
  };

  const unHideButton = () => {
    return (
      <Avatar
        squared
        icon={<EyeIcon className="w-full" />}
        onClick={passwordHandler}
        css={{ p: 10 }}
        as="button"
        pointer
      />
    );
  };

  return (
    <div>
      <Modal
        closeButton
        open={visible}
        onClose={closeHandler}
        aria-labelledby="modal-title"
      >
        <Spacer y={1} />
        <Modal.Header>
          <Container
            display="flex"
            direction="row"
            alignItems="center"
            css={{ p: 0 }}
          >
            <Avatar
              icon={<WifiIcon className="h-5 w-5 text-teal-50" />}
              color="primary"
            />
            <Text b size={18} span css={{ ml: 8 }}>
              {title}
            </Text>
            {loading || qrvisible ? (
              <></>
            ) : (
              <EditButton
                activeTitle={title}
                setTitle={setTitle}
                activeValue={value}
                setValue={setValue}
                activeType={NoteTypes.WIFI}
                activeId={id}
              />
            )}
          </Container>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <>Loading...</>
          ) : (
            <>
              {qrvisible ? (
                <Container css={{ textAlign: 'center' }}>
                  <Container>
                    {qrCodeText.length > 0 && <QRCode value={qrCodeText} />}
                  </Container>
                </Container>
              ) : (
                <Container
                  direction="row"
                  display="flex"
                  alignItems="flex-end"
                  justify="space-between"
                  css={{ p: 0 }}
                >
                  <Input
                    label="Username"
                    readOnly
                    width="86%"
                    initialValue={value.substring(0, value.indexOf(':'))}
                  />
                  <Input
                    label="Password"
                    width="86%"
                    type={passwordShown ? 'text' : 'password'}
                    initialValue={value.substring(value.indexOf(':') + 1)}
                  />
                  {unHideButton()}
                </Container>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {loading ? (
            <></>
          ) : (
            <Container
              direction="row"
              display="flex"
              alignItems="flex-end"
              justify="space-between"
              css={{ p: 0 }}
            >
              <Button
                auto
                rounded
                onClick={qrCodeHandler}
                icon={<QrcodeIcon className="h-6 w-6 text-teal-50" />}
              >
                {!qrvisible ? 'Get QR Code' : 'Hide QR Code'}
              </Button>
              <Button auto rounded onClick={closeHandler}>
                Done
              </Button>
            </Container>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WifiModal;
