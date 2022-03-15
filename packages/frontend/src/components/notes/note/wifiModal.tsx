import { DocumentAddIcon, EyeIcon, QrcodeIcon } from '@heroicons/react/outline';
import { LinkIcon, WifiIcon } from '@heroicons/react/solid';
import { Avatar, Button, Container, Input, Modal, Spacer, Text } from '@nextui-org/react';
import React, { useState } from 'react';

interface WifiModalProps {
  visible: boolean;
  setVisible(value: boolean): void;
  loading: boolean;
  userName: string;
  password: string;
}

const WifiModal: React.FC<WifiModalProps> = ({
  visible,
  setVisible,
  loading,
  userName,
  password
}) => {

  const closeHandler = () => {
    setVisible(false);
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const passwordHandler = () => {
    setPasswordShown(!passwordShown);
  };

  const pass = password

  const unHideButton = () => {
    
    return (
      <Avatar
        squared
        icon={<EyeIcon />}
        onClick={passwordHandler}
        css={{ p: 10 }}
        as="button"
        pointer
      />
    );
  };

  const editButton = () => {
    return (
      <Avatar
        squared
        icon={<DocumentAddIcon />}
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
        <Spacer y={1}/>
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
              House Wifi
            </Text>
            {loading ? (
              <></>
            ) : (
              editButton()
            )}
          </Container>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <>Loading...</>
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
                initialValue={userName}
              />
              <Input
                label="Password"
                width="86%"
                type={passwordShown ? "text" : "password"}
                initialValue={password}
              />
              {unHideButton()}
            </Container>
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
            <Button auto rounded onClick={closeHandler} icon={<QrcodeIcon className="h-6 w-6 text-teal-50" />}>
              Get QR Code
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