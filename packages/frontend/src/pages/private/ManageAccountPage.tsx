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
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-b from-land_page_bg_start to-land_page_bg_end">
      <div className="flex flex-row items-center justify-between p-12">
        <div className="flex flex-row items-center justify-start gap-2 sm:gap-3">
          <div className="w-12 h-8 bg-center bg-no-repeat bg-contain sm:w-24 sm:h-12 bg-logo" />
          <h1 className="text-3xl font-bold text-white sm:text-5xl">
            FlatShare
          </h1>
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
      <Container className="flex flex-col items-center w-full h-full translate-y-10 sm:translate-y-20 flex-nowrap justify-items-center">
        <h1 className="mb-20 text-5xl font-bold leading-tight text-center text-white">
          Get Started By Creating or Joining a Flat
        </h1>
        <Button
          className="w-56 py-8 mb-2 text-2xl text-white"
          color="secondary"
          bordered={true}
          onClick={createHandler}
        >
          Create Flat
        </Button>

        <Spacer x={50} />
        <Button
          className="w-56 py-8 text-2xl text-white"
          color="secondary"
          bordered={true}
          onClick={joinHandler}
        >
          Join Flat
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
