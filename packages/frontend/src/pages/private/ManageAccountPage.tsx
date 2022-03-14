import { Avatar, Button, Container, Spacer, Text } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateHouseModal from '../../components/account/CreateHouseModal';
import JoinHouseModal from '../../components/account/JoinHouseModal';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';

interface ManageAccountPageProps {}

const ManageAccountPage: React.FC<ManageAccountPageProps> = () => {
  const [joinVisible, setJoinVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  // Hook for the Join Button Modal to be configured
  const joinHandler = () => setJoinVisible(true);

  // Hook for the Create Button Modal to be configured
  const createHandler = () => setCreateVisible(true);

  // If the user joined house then cannot create house.
  const { data } = useApi('/api/v1/house', {
    method: 'get',
  });

  useEffect(() => {
    if (data?.code) {
      // if the users already joined a house, go to the home.
      navigate('/home');
    }
  }, [data, navigate]);

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
          className="float-right m-5"
        />
      </div>
      <Container className="absolute top-1/2 left-1/2 -translate-x-[10%] -translate-y-1/2">
        <Button
          className="p-10"
          color="secondary"
          bordered={true}
          onClick={createHandler}
        >
          <Text color="secondary" size="2em">
            CREATE
          </Text>
        </Button>

        <Spacer x={50} />
        <Button
          className="p-10"
          color="secondary"
          bordered={true}
          onClick={joinHandler}
        >
          <Text color="secondary" size="2em">
            JOIN
          </Text>
        </Button>
      </Container>

      <CreateHouseModal
        createVisible={createVisible}
        setCreateVisible={setCreateVisible}
      />

      <JoinHouseModal
        joinVisible={joinVisible}
        setJoinVisible={setJoinVisible}
      />
    </div>
  );
};

export default ManageAccountPage;
