import React from 'react';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { PlusIcon } from '@heroicons/react/outline';
import Page from '../../components/common/layout/Page';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import { Button, Input, Modal, Text, Textarea } from '@nextui-org/react';
import { useHouse } from '../../hooks/useHouse';

const noteType = [{ name: 'Normal' }, { name: 'Secret' }, { name: 'WiFi' }];

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
        <Button
          auto
          size="sm"
          onClick={createNoteHandler}
          icon={<PlusIcon className="w-6 h-6" />}
        ></Button>
      </div>
    </Page>
  );
};

export default CreateNotePage;
