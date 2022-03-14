import { getAuth } from 'firebase/auth';
import React from 'react';
import { useParams } from 'react-router-dom';
import cx from 'classnames';
import { Spacer } from '@nextui-org/react';

interface BillDetailPageProps {}

const BillDetailPage: React.FC<BillDetailPageProps> = () => {
  const bills = [
    {
      id: 1,
      name: "GinToki's home rental",
      description:
        'GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!GinToki! pay your home rental now!',
      owner: 'firebaseID',
      due: 1647215067300,
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
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  console.log([id, ' in Bill Detail Page']);
  console.log([userId, ' is the current User']);

  // replace with backend call
  const bill = bills.find((b) => b.id === parseInt(id!));

  const isOwner = userId === bill?.owner;

  const onUpload = async (userId: string) => {};

  const toggleComplete = async () => {};

  return (
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
            <button
              className={
                'text-white flex justify-center items-center transition-all bg-teal-500 hover:bg-teal-400 rounded-full px-4 py-2 font-medium h-fit'
              }
              onClick={() => toggleComplete()}
            >
              Complete
            </button>
          </div>
          <div className="rounded-b-xl px-4 lg:px-8 py-4 flex flex-col items-center gap-y-1 bg-gray-800 h-full">
            <div className="flex flex-col lg:flex-row justify-between items-start">
              <div className="flex flex-col lg:w-1/2">
                <DetailRow title="Description" value={bill?.description!} />
                <Spacer y={2} />
                <DetailRow title="Due" value={bill?.due?.toString()!} />
                <Spacer y={2} />
              </div>
              <div className="flex flex-col lg:w-1/2">
                <div className="font-bold text-3xl text-teal-500">Payment</div>
                <div className="flex flex-col">
                  {bill?.users.map((u) => (
                    <div
                      key={u.id}
                      className="flex flex-col w-full items-start py-2"
                    >
                      <div className="font-bold text-base md:text-xl text-white">
                        {u.id.toString()}
                      </div>
                      <div className="flex flex-row w-full justify-between items-start">
                        <div className="font-bold text-base md:text-2xl text-white">
                          {u.paid ? <>Paid</> : <>${u.amount}</>}
                        </div>
                        {userId === u.id ? (
                          <button
                            className={
                              'text-white flex justify-center items-center transition-all bg-teal-500 hover:bg-teal-400 rounded-full px-4 py-2 font-medium h-fit'
                            }
                            onClick={() => onUpload(u.id)}
                          >
                            Upload
                          </button>
                        ) : (
                          <div className=""></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DetailRowProps {
  title: string;
  value: string;
}
const DetailRow: React.FC<DetailRowProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col items-start">
      <div className="font-bold text-base md:text-2xl text-teal-500">
        {title}
      </div>
      <div className="font-bold text-base md:text-xl text-white">{value}</div>
    </div>
  );
};

export default BillDetailPage;
