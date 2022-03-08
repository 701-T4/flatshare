import { Button, Col, Container, Row } from '@nextui-org/react';
import React from 'react';
import { useApi } from '../../hooks/useApi';

interface AccountMgmtPageProps {}

const btnStyle = {
  width: '100%',
  padding: '30px',
};

const AccountMgmtPage: React.FC<AccountMgmtPageProps> = () => {
  // get the house status
  const { data } = useApi('/api/v1/ping', {
    method: 'get',
  });

  function handleCreatingHouse(): void {
    //direct to the creating house page
  }

  function handleJoiningHouse(): void {
    // pop up a window that allows users to enter the code
  }

  return (
    <Container style={{ position: 'absolute', top: '50%' }}>
      <Row gap={5}>
        <Col>
          <Button color="secondary" bordered={true} style={btnStyle}>
            CREATE
          </Button>
        </Col>
        <Col>
          <Button color="secondary" bordered={true} style={btnStyle}>
            JOIN
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountMgmtPage;
