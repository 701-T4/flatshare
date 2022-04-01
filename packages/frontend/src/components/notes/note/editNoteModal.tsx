import React, { useState } from 'react';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useApiMutation } from '../../../hooks/useApi';
import {
  Button,
  Container,
  Input,
  Modal,
  Text,
  Textarea,
} from '@nextui-org/react';

const noteType = ['Normal', 'Secret', 'WiFi'];

interface EditNoteModalProps {
  editNoteVisible: boolean;
  setEditNoteVisible(value: boolean): void;
  activeTitle: string;
  activeValue: string;
  activeType: string;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({
  editNoteVisible,
  setEditNoteVisible,
  activeTitle,
  activeValue,
  activeType,
}) => {
  const closeNoteHandler = () => setEditNoteVisible(false);
  const [selected, setSelected] = useState(activeType);
  const [showWifiInputs, setShowWifiInputs] = useState(activeType === 'WiFi');
  interface tempNote {
    title: string;
    value: string;
    type: string;
  }
  const [editedNote, setEditedNote] = useState<tempNote>({
    title: 'string;',
    value: 'string;',
    type: 'string;',
  });

  const editNote = useApiMutation('/api/v1/house/note/{id}', { method: 'put' });

  const saveCaller = async () => {
    await editNote({
      pathParams: { id: 1 ?? '' },
      body: {
        name: editedNote.title,
        value: editedNote.value,
        type: editedNote.type as 'PLAIN' | 'SECRET' | 'WIFI',
      },
    });
  };

  return (
    <Modal
      closeButton
      blur
      width="75%"
      open={editNoteVisible}
      onClose={closeNoteHandler}
    >
      <Modal.Header>
        <Text b size={22}>
          Edit Note
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
          placeholder="Note Name"
          size="xl"
          color="primary"
          initialValue={activeTitle}
          contentEditable={true}
          onChange={(e) =>
            setEditedNote((prevState) => ({
              ...prevState,
              title: e.target.value,
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
            if (e === 'WiFi') setShowWifiInputs(true);
            else setShowWifiInputs(false);

            setEditedNote((prevState) => ({
              ...prevState,
              type: 'PLAIN',
            }));

            switch (e) {
              case 'Normal':
                setEditedNote((prevState) => ({
                  ...prevState,
                  type: 'PLAIN',
                }));
                break;
              case 'Secret':
                setEditedNote((prevState) => ({
                  ...prevState,
                  type: 'SECRET',
                }));
                break;
              case 'WiFi':
                setEditedNote((prevState) => ({
                  ...prevState,
                  type: 'WIFI',
                }));
                break;
            }
          }}
        >
          <div className="relative mt-1">
            <Listbox.Button className="h-12 relative w-full py-1 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default sm:text-xl">
              <span className="block truncate">{selected}</span>
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
                          {note}
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
              initialValue={activeValue.substring(0, activeValue.indexOf(':'))}
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
              initialValue={activeValue.substring(activeValue.indexOf(':') + 1)}
            ></Input>
          </Container>
        ) : null}

        {/* To disable the Description textarea when WiFi is selected as we don't need it then */}

        {!showWifiInputs ? (
          <Container direction="column" display="flex" css={{ p: 0 }}>
            <Text size={'1.25rem'} margin="1.5%">
              Description
            </Text>
            <Textarea
              aria-label="description name"
              bordered
              placeholder="Enter your note here"
              size="xl"
              color="primary"
              initialValue={activeValue}
              onChange={(e) =>
                setEditedNote((prevState) => ({
                  ...prevState,
                  value: e.target.value,
                }))
              }
            ></Textarea>
          </Container>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button
          size="md"
          className="sm: text-lg"
          onClick={(event) => {
            saveCaller();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditNoteModal;
