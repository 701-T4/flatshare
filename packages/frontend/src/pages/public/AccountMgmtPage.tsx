import {
  Avatar,
  Button,
  Col,
  Container,
  Input,
  Modal,
  Row,
  Text,
} from '@nextui-org/react';
import React from 'react';
import { useApi } from '../../hooks/useApi';

interface AccountMgmtPageProps {
  userName?: string;
}

const btnStyle = {
  width: '100%',
  padding: '30px',
};

const AccountMgmtPage: React.FC<AccountMgmtPageProps> = (
  props: AccountMgmtPageProps,
) => {
  // get the house status
  const { data } = useApi('/api/v1/ping', {
    method: 'get',
  });

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };

  function handleCreatingHouse(): void {
    //direct to the creating house page
  }

  function handleJoiningHouse(): void {
    // pop up a window that allows users to enter the code
  }

  return (
    <div>
      <Avatar
        text={props.userName}
        color="secondary"
        size="xl"
        squared
        style={{
          float: 'right',
          margin: '20px',
        }}
      />

      <Container style={{ position: 'absolute', top: '50%' }}>
        <Row gap={5}>
          <Col>
            <Button color="secondary" bordered={true} style={btnStyle}>
              CREATE
            </Button>
          </Col>
          <Col>
            <Button
              color="secondary"
              bordered={true}
              style={btnStyle}
              onClick={handler}
            >
              JOIN
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Enter House Code
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="House Code"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto onClick={closeHandler}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccountMgmtPage;
