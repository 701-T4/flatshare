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

const noteType = [{ name: 'Normal' }, { name: 'Secret' }, { name: 'WiFi' }];

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

  return (
    <Modal
      closeButton
      blur
      width="75%"
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
        <Listbox
          value={selected}
          onChange={(e) => {
            setSelected(e);
            if (e.name === 'WiFi') setShowWifiInputs(true);
            else setShowWifiInputs(false);
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
            <Text size={'1.25rem'} margin="1.5%">
              Description
            </Text>
            <Textarea
              aria-label="description name"
              bordered
              placeholder="Enter your note here"
              size="xl"
              color="primary"
            ></Textarea>
          </Container>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button size="md" className="sm: text-lg">
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewNoteModal;
