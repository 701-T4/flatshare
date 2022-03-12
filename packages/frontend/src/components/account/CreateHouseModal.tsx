import { Button, Input, Modal, Text } from '@nextui-org/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HouseServices } from '../../services/HouseService';

interface CreateHouseModalProps {
  createVisible: boolean;
  setCreateVisible(value: boolean): void;
}
const CreateHouseModal: React.FC<CreateHouseModalProps> = ({
  createVisible,
  setCreateVisible,
}) => {
  interface NewHouseDetails {
    phone: string;
    address: string;
    name: string;
  }

  const [newHouseouseDetails, setNewHouseDetails] = useState<NewHouseDetails>({
    phone: '',
    address: '',
    name: '',
  });
  const navigate = useNavigate();

  const closeCreateHandler = () => {
    setCreateVisible(false);
  };

  async function handleCreatingHouse() {
    try {
      setCreateVisible(false);
      await HouseServices.createHouse(newHouseouseDetails);
      navigate('/home');
    } catch (e) {}
  }

  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="create-modal"
        open={createVisible}
        width={'50%'}
        onClose={closeCreateHandler}
      >
        <Modal.Header>
          <Text id="modal-title-create" size={'1.75rem'}>
            Let's create your first flat!
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text size={'1.25rem'} margin="2%">
            Name
          </Text>
          <Input
            clearable
            bordered
            placeholder="Enter  a name for your flat"
            size="xl"
            color="primary"
            onChange={(e) =>
              setNewHouseDetails((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
          <Text size={'1.25rem'} margin="2%">
            Address
          </Text>
          <Input
            clearable
            bordered
            placeholder="Enter your address"
            size="xl"
            color="primary"
            onChange={(e) =>
              setNewHouseDetails((prevState) => ({
                ...prevState,
                address: e.target.value,
              }))
            }
          />
          <Text size={'1.25rem'} margin="2%">
            Phone Number
          </Text>
          <Input
            clearable
            bordered
            placeholder="Enter your phone number"
            size="xl"
            color="primary"
            onChange={(e) =>
              setNewHouseDetails((prevState) => ({
                ...prevState,
                phone: e.target.value,
              }))
            }
          />
        </Modal.Body>

        <Modal.Footer>
          <Button auto onClick={handleCreatingHouse} size="lg">
            Create!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateHouseModal;
