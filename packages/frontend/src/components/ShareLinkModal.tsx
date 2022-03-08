import {
  Avatar,
  Button,
  Container,
  Input,
  Loading,
  Modal,
  Text,
} from '@nextui-org/react';
import React from 'react';
import { DuplicateIcon, LinkIcon } from '@heroicons/react/outline';
import { UserAddIcon } from '@heroicons/react/solid';

interface ShareLinkModalProps {
  visible: boolean;
  setVisible(value: boolean): void;
}

const ShareLinkModal: React.FC<ShareLinkModalProps> = ({
  visible,
  setVisible,
}) => {
  // TODO: change to valid api call ===============
  const getHouseCode = () => {
    return { data: 'house12345678' };
  };
  const { data: code } = getHouseCode();

  const copyButton = () => {
    return (
      <Avatar
        rounded
        icon={<DuplicateIcon className="h-5 w-5" />}
        onClick={() => console.log('copied!')}
        css={{ p: 10 }}
        as="button"
      />
    );
  };
  // ==============================================

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <div>
      <Modal
        closeButton
        open={visible}
        onClose={closeHandler}
        aria-labelledby="modal-title"
      >
        <Modal.Header>
          <Container
            display="flex"
            direction="row"
            alignItems="center"
            css={{ p: 0 }}
          >
            <Avatar
              icon={<UserAddIcon className="h-5 w-5 text-teal-50" />}
              color="primary"
            />
            <Text b size={18} span css={{ ml: 8 }}>
              Invite flatmates!
            </Text>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Input
            label="Share this link to add flatmates"
            readOnly
            initialValue={`localhost:3000?join=${code}`}
            contentLeft={<LinkIcon className="h-5 w-5" />}
            contentRight={copyButton()}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto rounded onClick={closeHandler}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShareLinkModal;
