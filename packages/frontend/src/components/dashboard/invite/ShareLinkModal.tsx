import { CheckIcon, DuplicateIcon, LinkIcon } from '@heroicons/react/outline';
import { UserAddIcon } from '@heroicons/react/solid';
import {
  Avatar,
  Button,
  Container,
  Input,
  Modal,
  Text,
} from '@nextui-org/react';
import React, { useState } from 'react';

interface ShareLinkModalProps {
  visible: boolean;
  setVisible(value: boolean): void;
  houseCode?: string;
  loading: boolean;
}

const ShareLinkModal: React.FC<ShareLinkModalProps> = ({
  visible,
  setVisible,
  houseCode,
  loading,
}) => {
  const link = `${window.location.origin}/auth?join=${houseCode}`;
  const [copied, setCopied] = useState(false);
  const [icon, setIcon] = useState(<DuplicateIcon className="h-5 w-5" />);
  const copyHandler = () => {
    setCopied(true);
    navigator.clipboard.writeText(link);
    setIcon(<CheckIcon className="h-5 w-5 text-teal-600" />);
    setTimeout(setIcon, 1500, <DuplicateIcon className="h-5 w-5" />);
  };

  const closeHandler = () => {
    setVisible(false);
    setCopied(false);
  };

  const copyButton = () => {
    return (
      <Avatar
        squared
        icon={icon}
        onClick={copyHandler}
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
                label="Share this link to add flatmates"
                readOnly
                initialValue={link}
                contentLeft={<LinkIcon className="h-5 w-5" />}
                width="86%"
              />
              {copyButton()}
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          {copied ? (
            <Text b color="primary" margin="0 8px">
              Copied!
            </Text>
          ) : null}

          <Button auto rounded onClick={closeHandler}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShareLinkModal;
