import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import cx from 'classnames';
import { Button, Spacer, Switch } from '@nextui-org/react';
import { v4 as uuidv4 } from 'uuid';
import NewBillCard from '../../components/bill/NewBillCard';
import { UserAddIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/outline';
interface BillDetailPageProps {}

const BillDetailPage: React.FC<BillDetailPageProps> = () => {
  const bills = [
    {
      id: 1,
      name: "GinToki's home rental",
      description:
        'GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!',
      owner: 'Kvi306xYuzSDQm3nJKQ42LLMKSC3',
      due: 1647215067300,
      completed: true,
      users: [
        {
          id: 'firebaseId fassdas',
          amount: 30, //$
          paid: false,
          proof: 'blob id', //optional
        },
        {
          id: 'Kvi306xYuzSDQm3nJKQ42LLMKSC3',
          amount: 30, //$
          paid: false,
          proof: 'blob id', //optional
        },
        {
          id: 'firebaseId2',
          amount: 30, //$
          paid: true,
          proof: 'blob id', //optional
        },
        {
          id: 'firebaseId3',
          amount: 30, //$
          paid: false,
          proof: 'blob id', //optional
        },
      ],
    },
  ];

  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState<File | null | undefined>(undefined);
  const navigate = useNavigate();
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  console.log([id, ' in Bill Detail Page']);
  console.log([userId, ' is the current User']);

  // replace with backend call
  const bill = bills.find((b) => b.id === parseInt(id!));

  const isOwner = userId === bill?.owner;

  const onUpload = async (userId: string) => {
    // Create a root reference
    const storage = getStorage();
    const fileName = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    const storageRef = ref(storage, fileName);
    uploadBytes(storageRef, image!).then((snapshot) => {
      console.log(snapshot.ref.name);
      console.log(snapshot.ref.name);
    });
  };

  const toggleComplete = async () => {};
  const parseFileName = (fileName: String) => {
    if (fileName.length < 22) {
      return fileName;
    }
    return fileName.slice(0, 10) + '...' + fileName.slice(-10);
  };
  const deleteBill = async () => {
    navigate('/bills', { replace: true });
  };
  return (
    <>
      {isOwner ? (
        <Button onClick={() => setIsEdit(!isEdit)}>Edit</Button>
      ) : (
        <></>
      )}
      {isEdit ? (
        <div className="pt-10 px-10 md:px-20">
          <NewBillCard />
        </div>
      ) : (
        <div className="pt-10 px-10 md:px-20">
          <div className="shadow-lg rounded-b-xl">
            <div className="flex flex-col h-full">
              <div
                className={cx(
                  'bg-gradient-to-r from-red-400 to-red-600', //TODO to be extracted
                  'flex flex-row text-left items-center justify-between rounded-t-xl px-10 py-10 text-white font-semibold lg:text-3xl',
                )}
              >
                {bill?.name}
                <div className="flex flex-row items-center">
                  <Switch
                    className="self-end mb-1 mr-5"
                    onChange={() => toggleComplete()}
                  ></Switch>
                  {isOwner ? (
                    <Button
                      auto
                      onClick={() => deleteBill()}
                      icon={<TrashIcon className="h-5 w-5 text-teal-50" />}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="rounded-b-xl px-4 lg:px-8 py-4 flex flex-col items-center gap-y-1 bg-gray-800 h-full">
                <div className="flex flex-col lg:flex-row justify-between items-start">
                  <div className="flex flex-col px-2 lg:w-1/2">
                    <DetailRow title="Description" value={bill?.description!} />
                    <Spacer y={2} />
                    <DetailRow title="Due" value={bill?.due?.toString()!} />
                    <Spacer y={2} />
                  </div>
                  <div className="flex flex-col px-2 lg:w-1/2">
                    <div className="font-bold text-3xl text-teal-500">
                      Payment
                    </div>
                    <div className="flex flex-col">
                      {bill?.users.map((u) => (
                        <UserRow u={u} userId={userId} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row self-end items-center justify-end">
                  <label
                    htmlFor="file-upload"
                    className="text-white flex bold justify-center items-center transition-all bg-teal-500 hover:bg-teal-400 rounded-full px-4 py-2 font-medium h-fit"
                  >
                    <input
                      id="file-upload"
                      hidden
                      type={'file'}
                      onChange={(e) => {
                        setImage(e.currentTarget.files?.item(0));
                      }}
                    ></input>
                    <span className="text-right max-w-xs text-clip overflow-hidden">
                      {image ? parseFileName(image.name) : 'Select File'}
                    </span>
                  </label>
                  <Spacer x={1} />
                  <button
                    className={
                      'text-white flex justify-center items-center transition-all bg-teal-500 hover:bg-teal-400 rounded-full px-4 py-2 font-medium h-fit'
                    }
                    onClick={() => onUpload(userId!)}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface DetailRowProps {
  title: string;
  value: string;
}
const DetailRow: React.FC<DetailRowProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col items-start">
      <div className="font-bold text-base md:text-3xl text-teal-500">
        {title}
      </div>
      <div className="font-bold text-base md:text-xl py-2 text-white">
        {value}
      </div>
    </div>
  );
};
interface UserRowProp {
  u: {
    id: string;
    amount: number;
    paid: boolean;
    proof: string;
  };
  userId: string | undefined;
}

const UserRow: React.FC<UserRowProp> = ({ u, userId }) => {
  const getUserFromId = (uid: String) => {
    return 'Gintoki' + uid; //TODOS: get it locally from useHome() hook
  };

  return (
    <div key={u.id} className="flex flex-col w-full items-start py-2">
      <div className="font-bold text-base md:text-xl text-white">
        {getUserFromId(u.id)}
      </div>
      <div className="flex flex-row w-full justify-between items-start">
        <div className="font-bold text-base md:text-2xl text-white">
          {u.paid ? <>Paid</> : <>${u.amount}</>}
        </div>
        {userId === u.id ? <></> : <div className=""></div>}
      </div>
    </div>
  );
};

export default BillDetailPage;
