import React, { useState } from 'react';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import {
  Button,
  Container,
  Input,
  Modal,
  Text,
  Textarea,
} from '@nextui-org/react';
import { useApiMutation } from '../../../hooks/useApi';
// import { useNavigate } from 'react-router-dom';

const NORMAL_TYPE = 'Normal';
const SECRET_TYPE = 'Secret';
const WIFI_TYPE = 'WiFi';

const noteType = [
  { name: NORMAL_TYPE },
  { name: SECRET_TYPE },
  { name: WIFI_TYPE },
];

interface NewNoteModalProps {
  createNoteVisible: boolean;
  setCreateNoteVisible(value: boolean): void;
}

const NewNoteModal: React.FC<NewNoteModalProps> = ({
  createNoteVisible,
  setCreateNoteVisible,
}) => {
  const closeNoteHandler = () => setCreateNoteVisible(false);

  const [selected, setSelected] = useState(noteType[0]);

  const [showWifiInputs, setShowWifiInputs] = useState(false);

  const [showSecretInputs, setShowSecretInputs] = useState(false);

  enum NoteTypes {
    PLAIN = 'PLAIN',
    SECRET = 'SECRET',
    WIFI = 'WIFI',
  }

  interface NewNoteDetails {
    name: string;
    value: string;
    type: "PLAIN" | "SECRET" | "WIFI";
  }

  const [newNoteDetails, setNoteDetails] = useState<NewNoteDetails>({
    name: '',
    value: '',
    type: NoteTypes.PLAIN,
  });

  // const { data, mutate } = useApi('/api/v1/house/note', { method: 'get' });

  const createNote = useApiMutation('/api/v1/house/note', { method: 'post' });

  async function onClickCreate() {
    try {
      const { name, value, type } = newNoteDetails;
      await createNote({ body: { name, value, type } });
      // mutate();
      setCreateNoteVisible(false);
    } catch (e) {}
  }

  return (
    <Modal
      closeButton
      blur
      width="75%"
      open={createNoteVisible}
      onClose={closeNoteHandler}
    >
      <Modal.Header css={{ cursor: 'auto' }}>
        <Text b size={22}>
          Create a New Note
        </Text>
      </Modal.Header>
      <Modal.Body css={{ cursor: 'auto' }}>
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
          onChange={(e) =>
            setNoteDetails((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        ></Input>
        <Text size={'1.25rem'} margin="1.5%">
          Type
        </Text>
        {/* This is just as a start. Will use Tailwind for this and not some ugly select tag haha */}
        <Listbox
          value={selected}
          onChange={(e) => {
            setSelected(e);
            if (e.name === WIFI_TYPE) setShowWifiInputs(true);
            else setShowWifiInputs(false);
            if (e.name === SECRET_TYPE) setShowSecretInputs(true);
            else setShowSecretInputs(false);
            if (e.name === NORMAL_TYPE) setNoteDetails((prevState) => ({
              ...prevState,
              type: NoteTypes.PLAIN,
            }));
            if (e.name === WIFI_TYPE) setNoteDetails((prevState) => ({
              ...prevState,
              type: NoteTypes.WIFI,
            }));
            if (e.name === SECRET_TYPE) setNoteDetails((prevState) => ({
              ...prevState,
              type: NoteTypes.SECRET,
            }));
          }}
        >
          <div className="relative mt-1">
            <Listbox.Button className="h-12 relative w-full py-1 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default sm:text-xl">
              <span className="block truncate">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-teal-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 sm:text-xl z-10">
                {noteType.map((note) => (
                  <Listbox.Option
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-300 text-white' : 'text-gray-900'
                      }`
                    }
                    value={note}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {note.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-teal-300">
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        {/* To show the wifi username and password fields once WiFi is selected */}

        {showWifiInputs ? (
          <Container direction="column" display="flex" css={{ p: 0 }}>
            <Text size={'1.25rem'} margin="1.5%">
              Username
            </Text>
            <Input
              aria-label="wifi name"
              clearable
              bordered
              placeholder="Enter the username"
              size="xl"
              color="primary"
            ></Input>
            <Text size={'1.25rem'} margin="1.5%">
              Password
            </Text>
            <Input
              aria-label="wifi password"
              clearable
              bordered
              placeholder="Enter the password"
              size="xl"
              color="primary"
            ></Input>
          </Container>
        ) : null}

        {/* To disable the Description textarea when WiFi is selected as we don't need it then */}

        {!showWifiInputs ? (
          <Container direction="column" display="flex" css={{ p: 0 }}>
            {showSecretInputs && (
              <Text size={'1rem'} margin="0% 0% 0% 1.5%" color="red">
                Warning: Secrets are not protected by a password. Be aware that
                all information stored will be accesible to your flatmates.
              </Text>
            )}
            <Text size={'1.25rem'} margin="1.5%">
              Description
            </Text>
            <Textarea
              aria-label="description name"
              bordered
              placeholder="Enter your note here"
              size="xl"
              color="primary"
              onChange={(e) =>
                setNoteDetails((prevState) => ({
                  ...prevState,
                  value: e.target.value,
                }))
              }
            ></Textarea>
          </Container>
        ) : null}
      </Modal.Body>
      <Modal.Footer css={{ cursor: 'auto' }}>
        <Button size="md" className="sm: text-lg" onClick={onClickCreate}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewNoteModal;
