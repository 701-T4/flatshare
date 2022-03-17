import React from 'react';
import Page from '../../components/common/layout/Page';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import { Button, Input, Modal, Text, Textarea } from '@nextui-org/react';
import { useHouse } from '../../hooks/useHouse';
import { BiPlus } from 'react-icons/bi';

interface CreateNotePageProps {}

const CreateNotePage: React.FC<CreateNotePageProps> = () => {
  const { name } = useHouse();

  const [createNoteVisible, setCreateNoteVisible] = React.useState(false);
  const createNoteHandler = () => setCreateNoteVisible(true);
  const closeNoteHandler = () => setCreateNoteVisible(false);

  return (
    <Page>
      <div className="flex justify-between items-center pb-1">
        <UnderlinedText colorClasses="from-gray-800 via-teal-700 to-teal-500 ">
          <div className="text-lg font-medium">
            Create Note
            <span className="text-teal-500 font-semibold">{name}</span>
          </div>
        </UnderlinedText>
        <Button auto size="sm" onClick={createNoteHandler}>
          <BiPlus size={'1.5em'} />
        </Button>
        <Modal
          closeButton
          blur
          width="50%"
          open={createNoteVisible}
          onClose={closeNoteHandler}
        >
          <Modal.Header>
            <Text b size={22}>
              Create a New Note
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text size={'1.25rem'} margin="1.5%">
              Note Name
            </Text>
            <Input
              aria-label="note name"
              clearable
              bordered
              placeholder="Enter your note header"
              size="xl"
              color="primary"
            ></Input>
            <Text size={'1.25rem'} margin="1.5%">
              Type
            </Text>
            {/* This is just as a start. Will use Tailwind for this and not some ugly select tag haha */}
            <select>
              <option> Normal </option>
              <option> Secret </option>
              <option> WiFi </option>
            </select>
            {/* <Text size = {'1.25rem'} margin = '1.5%'>
                            Description
                        </Text>
                        <Textarea
                            aria-label="description name"
                            bordered
                            placeholder="Enter your note here"
                            size="xl"
                            color="primary"
                        >
                        </Textarea> */}
          </Modal.Body>
          <Modal.Footer>
            <Button size="md">Next</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Page>
  );
};

export default CreateNotePage;
