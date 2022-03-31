import { DocumentIcon } from '@heroicons/react/solid';
import {
  Avatar,
  Button,
  Container,
  Modal,
  Spacer,
  Text,
} from '@nextui-org/react';
import EditButton from './editButton';

interface PlainModalProps {
  visible: boolean;
  setVisible(value: boolean): void;
  loading: boolean;
  data: string | undefined;
  title: string;
}

const PlainModal: React.FC<PlainModalProps> = ({
  visible,
  setVisible,
  loading,
  data,
  title,
}) => {
  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <div>
      <Modal
        closeButton
        scroll
        width="75%"
        open={visible}
        onClose={closeHandler}
        aria-labelledby="modal-title"
      >
        <Spacer y={1} />
        <Modal.Header>
          <Container
            display="flex"
            direction="row"
            alignItems="center"
            css={{ p: 0 }}
          >
            <Avatar
              icon={<DocumentIcon className="h-5 w-5 text-teal-50" />}
              color="primary"
            />
            <Text b size={18} span css={{ ml: 8 }}>
              {title}
            </Text>
            {loading ? <></> : <EditButton />}
          </Container>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <>Loading...</>
          ) : (
            <Container
              direction="row"
              display="flex"
              alignItems="flex-end"
              justify="space-between"
              css={{ p: 0 }}
            >
              <Text id="modal-title">{data}</Text>
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          {loading ? (
            <></>
          ) : (
            <Button auto rounded onClick={closeHandler}>
              Done
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlainModal;
