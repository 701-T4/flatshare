import { Button, Card, Text, Modal, Input, Backdrop } from '@nextui-org/react';
import React from 'react';
import { useApi } from '../../hooks/useApi';

interface CreateHousePageProps {}

const CreateHousePage: React.FC<CreateHousePageProps> = () => {
  const { data } = useApi('/api/v1/ping', {
    method: 'get',
  });
  if (data) {
    const { env, time } = data;
    console.log({ env, time });
  }

  const [createVisible, setCreateVisible] = React.useState(false);
  const createHandler = () => setCreateVisible(true);
  const closeCreateHandler = () => {
    setCreateVisible(false);
  };

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-b from-land_page_bg_start to-land_page_bg_end">
      <div>
        <Modal open={true} animated={true} preventClose={true} width={'50%'}>
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
              placeholder="Enter your name"
              size="xl"
              color="primary"
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
            />
          </Modal.Body>

          <Modal.Footer>
            <Button auto onClick={closeCreateHandler} size="lg">
              Create!
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CreateHousePage;
