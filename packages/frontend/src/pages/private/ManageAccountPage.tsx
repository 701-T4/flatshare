import {
  Avatar,
  Button,
  Container,
  Input,
  Modal,
  Spacer,
  Text,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import { HouseServices } from '../../services/HouseService';

interface ManageAccountPageProps {}

const btnStyle = {
  padding: '40px',
};

const ManageAccountPage: React.FC<ManageAccountPageProps> = (
  props: ManageAccountPageProps,
) => {
  const [joinVisible, setJoinVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [houseCode, setHouseCode] = useState('');
  const [joinedHouse, setJoinedHouse] = useState(false);
  const [houseData, setHouseData] = useState();
  const { user } = useAuth();

  // Hook for the Join Button Modal to be configured
  const handler = () => setJoinVisible(true);
  const closeJoinHandler = () => {
    setJoinVisible(false);
  };

  // Hook for the Create Button Modal to be configured
  const createHandler = () => setCreateVisible(true);
  const closeCreateHandler = () => {
    setCreateVisible(false);
  };

  function handleJoiningHouse() {
    setJoinVisible(false);
    HouseServices.joinHouse(houseCode).then((data) => {
      console.log(data);
      //setHouseData(data? '');
    });
  }

  // If the user joined house then cannot create house.
  // use
  const { data } = useApi('/api/v1/house', {
    method: 'get',
  });

  console.log(data);

  useEffect(() => {
    if (data?.code) {
      setJoinedHouse(true);
    }
  }, [data]);

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-b from-land_page_bg_start to-land_page_bg_end">
      <div className="flex flex-row items-center justify-between p-12">
        <div className="flex flex-row items-center justify-start gap-12">
          <div className="w-24 h-12 bg-center bg-no-repeat bg-contain bg-logo" />
          <Text h1 size={50} color="white" weight="bold">
            RentShare
          </Text>
        </div>
        <Avatar
          icon={
            <img
              alt="Avatar"
              className="rounded-full"
              src={user?.photoURL ?? ''}
            />
          }
          color="secondary"
          size="xl"
          squared
          style={{
            float: 'right',
            margin: '20px',
          }}
        />
      </div>
      {/* // position: 'absolute', top: '50%', transform: 'translate(0, -50%)' */}
      <Container
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-10%, -50%)',
        }}
      >
        {joinedHouse && (
          <Button
            color="secondary"
            bordered={true}
            style={btnStyle}
            onClick={createHandler}
          >
            <Text color="secondary" size="2em">
              CREATE
            </Text>
          </Button>
        )}

        <Spacer x={50} />

        <Button
          color="secondary"
          bordered={true}
          style={btnStyle}
          onClick={handler}
        >
          <Text color="secondary" size="2em">
            JOIN
          </Text>
        </Button>
      </Container>

      {/* Modal component that pops up once users press the CREATE button and asks for an user's details to create their flat */}
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

      {/* Modal component that pops up once users press the JOIN button and asks for a house code to join a particular house/flat */}
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

export default ManageAccountPage;
