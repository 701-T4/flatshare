import {
  Avatar,
  Button,
  Col,
  Container,
  Input,
  Link,
  Modal,
  Row,
  Text,
} from '@nextui-org/react';
import { getAuth } from 'firebase/auth';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

interface ManageAccountPageProps {}

const btnStyle = {
  width: '100%',
  padding: '30px',
};

const ManageAccountPage: React.FC<ManageAccountPageProps> = (
  props: ManageAccountPageProps,
) => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  function handleJoiningHouse(): void {
    // pass the data to the backend
    // direct the page to the house dahsboard
  }

  // get the house status, if its new users showing the account management page
  // if not, direct to the house they joined
  const { user } = useAuth();

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-b from-land_page_bg_start to-land_page_bg_end">
      <Avatar
        text={userData.displayName}
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
            {/* direct the users to the creating house page */}
            <Link href="/create" style={{ display: 'inherit' }}>
              <Button color="secondary" bordered={true} style={btnStyle}>
                <Text color="secondary" size="2em">
                  CREATE
                </Text>
              </Button>
            </Link>
          </Col>
          <Col>
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

export default ManageAccountPage;
