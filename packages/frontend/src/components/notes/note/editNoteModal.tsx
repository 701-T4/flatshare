import React, { useState } from 'react';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useApi, useApiMutation } from '../../../hooks/useApi';
import {
  Button,
  Container,
  Input,
  Modal,
  Text,
  Textarea,
} from '@nextui-org/react';
import { NoteTypes } from './noteCardController';
import { TrashIcon } from '@heroicons/react/outline';

const PLAIN_TYPE_TEXT = 'Plain';
const SECRET_TYPE_TEXT = 'Secret';
const WIFI_TYPE_TEXT = 'WiFi';

const noteType = [PLAIN_TYPE_TEXT, SECRET_TYPE_TEXT, WIFI_TYPE_TEXT];

interface EditNoteModalProps {
  editNoteVisible: boolean;
  setEditNoteVisible(value: boolean): void;
  activeTitle: string;
  setTitle: (value: string) => void;
  activeValue: string;
  setValue: (value: string) => void;
  activeType: string;
  activeId: string;
  setVisibleModal: (value: boolean) => void;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({
  editNoteVisible,
  setEditNoteVisible,
  activeTitle,
  setTitle,
  activeValue,
  setValue,
  activeType,
  activeId,
  setVisibleModal,
}) => {
  const closeNoteHandler = () => setEditNoteVisible(false);
  const [selected, setSelected] = useState(activeType);
  const [showWifiInputs, setShowWifiInputs] = useState(
    activeType === NoteTypes.WIFI,
  );
  const [showSecretInputs, setShowSecretInputs] = useState(
    activeType === NoteTypes.SECRET,
  );
  interface tempNote {
    title: string;
    value: string;
    type: string;
  }
  const [editedNote, setEditedNote] = useState<tempNote>({
    title: activeTitle,
    value: activeValue,
    type: activeType,
  });

  const editNote = useApiMutation('/api/v1/house/note/{id}', { method: 'put' });

  const deleteNote = useApiMutation('/api/v1/house/note/{id}', {
    method: 'delete',
  });

  const { mutate } = useApi('/api/v1/house/note', { method: 'get' });

  const handleDelete = async () => {
    setEditNoteVisible(false);
    setVisibleModal(false);
    mutate();
    await deleteNote({ pathParams: { id: activeId } });
  };

  const handleSave = async () => {
    await editNote({
      pathParams: { id: activeId },
      body: {
        name: editedNote.title,
        value: editedNote.value,
        type: editedNote.type as 'PLAIN' | 'SECRET' | 'WIFI',
      },
    });
    mutate();
    setValue(editedNote.value);
    setTitle(editedNote.title);
    setEditNoteVisible(false);
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
            if (e === WIFI_TYPE_TEXT) setShowWifiInputs(true);
            else setShowWifiInputs(false);
            if (e === SECRET_TYPE_TEXT) setShowSecretInputs(true);
            else setShowSecretInputs(false);

            setEditedNote((prevState) => ({
              ...prevState,
              type: NoteTypes.PLAIN,
            }));

            switch (e) {
              case PLAIN_TYPE_TEXT:
                setEditedNote((prevState) => ({
                  ...prevState,
                  type: NoteTypes.PLAIN,
                }));
                break;
              case SECRET_TYPE_TEXT:
                setEditedNote((prevState) => ({
                  ...prevState,
                  type: NoteTypes.SECRET,
                }));
                break;
              case WIFI_TYPE_TEXT:
                setEditedNote((prevState) => ({
                  ...prevState,
                  type: NoteTypes.WIFI,
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
              onChange={(e) =>
                setEditedNote((prevState) => ({
                  ...prevState,
                  value:
                    e.target.value +
                    ':' +
                    prevState.value.substring(0, prevState.value.indexOf(':')),
                }))
              }
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
              onChange={(e) =>
                setEditedNote((prevState) => ({
                  ...prevState,
                  value:
                    prevState.value.substring(0, prevState.value.indexOf(':')) +
                    ':' +
                    e.target.value,
                }))
              }
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
          auto
          onClick={() => handleDelete()}
          icon={<TrashIcon className="w-5 h-5 text-teal-50" />}
        />
        <Button
          size="md"
          className="sm: text-lg"
          onClick={(event) => {
            handleSave();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditNoteModal;
