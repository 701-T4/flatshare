import { Button, Modal, Text } from '@nextui-org/react';
import React from 'react';

interface HouseConflictModalProps {
  visible: boolean;
  setVisible(value: boolean): void;
}

const HouseConflictModal: React.FC<HouseConflictModalProps> = ({
  visible,
  setVisible,
}) => {
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
          <Text b size={18} span css={{ ml: 8 }}>
            Already assigned to a house!
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text size={16} span css={{ ml: 8, textAlign: 'center' }}>
            Please leave current house before joining a new house.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto rounded onClick={closeHandler}>
            Manage Houses
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HouseConflictModal;
