import { Button, Modal, Text } from '@nextui-org/react';

interface ErrorModalProps {
  visibleErrorModal: boolean;
  setVisibleErrorModal(value: boolean): void;
  errorMessage: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  visibleErrorModal,
  setVisibleErrorModal,
  errorMessage,
}) => {
  const closeHandler = () => {
    setVisibleErrorModal(false);
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visibleErrorModal}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Error
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text size={14}>{errorMessage}</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={closeHandler}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
