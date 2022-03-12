import { Button, Input, Modal, Text } from '@nextui-org/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiMutation } from '../../hooks/useApi';

interface CreateHouseModalProps {
  joinVisible: boolean;
  setJoinVisible(value: boolean): void;
}
const JoinHouseModal: React.FC<CreateHouseModalProps> = ({
  joinVisible,
  setJoinVisible,
}) => {
  const closeJoinHandler = () => {
    setJoinVisible(false);
  };

  const [houseCode, setHouseCode] = useState('');
  const navigate = useNavigate();

  const joinHouse = useApiMutation('/api/v1/house', { method: 'put' });

  async function handleJoiningHouse() {
    setJoinVisible(false);
    await joinHouse({ body: { houseCode } });

    //navigate the users to home after joining a house
    navigate('/home');
  }

  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={joinVisible}
        onClose={closeJoinHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={'1.75rem'}>
            Enter House Code
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="xl"
            placeholder="House Code"
            onChange={(e) => setHouseCode(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            onClick={() => {
              handleJoiningHouse();
            }}
            size="lg"
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JoinHouseModal;
