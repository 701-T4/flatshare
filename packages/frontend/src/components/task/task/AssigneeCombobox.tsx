import { Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

interface AssigneeComboboxProps {
  selected: { id: number; name: string };
  setSelected(value: { id: number; name: string }): void;
  assigneePool: { id: number; name: string }[];
}

const AssigneeCombobox: React.FC<AssigneeComboboxProps> = ({
  selected,
  assigneePool,
  setSelected,
}) => {
  const people = assigneePool;

  return (
    <div className="w-full">
      <Combobox value={selected} onChange={setSelected}>
        <Combobox.Label className="pl-1 text-teal-400">Assignee</Combobox.Label>
        <div className="relative mt-1">
          <div className="relative w-full text-left bg-white rounded-lg border-solid border-2 hover:border-teal-400 sm:text-sm overflow-hidden">
            <input
              className="w-full focus:ring-0 py-2 ml-1.5 pl-3 pr-10 h-11"
              value={selected.name}
              readOnly
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {people.map((person, index) => (
                <Combobox.Option
                  key={person.id}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active ? 'text-white bg-teal-400' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ active }) => {
                    return (
                      <>
                        <span
                          className={`block truncate ${
                            selected.name == person.name
                              ? 'font-medium'
                              : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected.name == person.name ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-teal-400' : 'text-teal-400'
                            }`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    );
                  }}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default AssigneeCombobox;
