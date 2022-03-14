import { Popover, Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ChevronDownIcon,
  CodeIcon,
  CogIcon,
  LogoutIcon,
  SpeakerphoneIcon,
} from '@heroicons/react/outline';
import React, { Fragment, useMemo, useState } from 'react';
import { usePopper } from 'react-popper';
import { useAuth } from '../../../hooks/useAuth';
import { auth } from '../../../services/firebase';
import { useAlert } from './CornerAlert';

const iconClass = 'bg-teal-100 text-teal-500 rounded-lg p-2.5';

const UserDropdown: React.FC = () => {
  const [referenceElement, setReferenceElement] = useState<any>();
  const [popperElement, setPopperElement] = useState<any>();
  const { styles, attributes } = usePopper(referenceElement, popperElement);
  const { user } = useAuth();
  const { createAlert } = useAlert();

  const dropdownOptions = useMemo(
    () => [
      {
        name: 'Settings',
        description: 'View and Modify your User Settings',
        action: () => {},
        icon: () => <CogIcon className={iconClass} />,
      },
      {
        name: 'Feedback',
        description: 'Leave Feedback on the App',
        action: () => {},
        icon: () => <SpeakerphoneIcon className={iconClass} />,
      },
      {
        name: 'Github',
        description: "View the App's Source on Github",
        action: () => {
          window.open('https://github.com/701-T4/platform', '__blank');
        },
        icon: () => <CodeIcon className={iconClass} />,
      },
      {
        name: 'Logout',
        description: 'Logout of the Application.',
        action: async () => {
          await auth.signOut();
          window.location.reload();
          createAlert(
            {
              icon: <CheckCircleIcon />,
              message: 'You have successfully been logged out.',
              mode: 'success',
            },
            3000,
          );
        },
        icon: () => <LogoutIcon className={iconClass} />,
      },
    ],
    [createAlert],
  );

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? '' : 'text-opacity-90'}
                text-gray-900 px-3 py-2 rounded-md bg-opacity-0 hover:bg-opacity-5 bg-gray-800 transition-all`}
            ref={setReferenceElement}
          >
            <div className="flex flex-row gap-x-4">
              <div className="hidden md:flex flex-col text-right">
                <span className="font-bold -mb-1 mt-0.5">
                  {user?.displayName}
                </span>
                <span>{user?.email}</span>
              </div>
              <img
                src={user?.photoURL ?? ''}
                referrerPolicy="no-referrer"
                alt="User Avatar"
                className="rounded-full w-12"
              />
              <ChevronDownIcon className="w-4" />
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className="absolute z-40 w-screen max-w-sm px-4 mt-16 transform -translate-x-2/3 md:-translate-x-[15%] sm:px-0"
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                  {dropdownOptions.map((item) => (
                    <button
                      key={item.name}
                      onClick={item.action}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 text-left"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                        <item.icon aria-hidden="true" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default UserDropdown;
