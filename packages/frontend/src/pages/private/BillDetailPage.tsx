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
      description: 'GinToki! pay your home rental now!',
      owner: 'firebaseID',
      due: 1647215067300,
      users: [
        {
          id: 'firebaseId',
          amount: 30, //$
          paid: false,
          proof: 'blob id', //optional
        },
        {
          id: 'firebaseId1',
          amount: 30, //$
          paid: false,
          proof: 'blob id', //optional
        },
        {
          id: 'firebaseId2',
          amount: 30, //$
          paid: false,
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

  // replace with backend call
  const bill = bills.find((b) => b.id === parseInt(id!));

  const onUpload = async (userId: string) => {};

  return (
    <div className="pt-10 px-20">
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
              onClick={() => onUpload('')}
            >
              Complete
            </button>
          </div>
          <div className="rounded-b-xl px-4 lg:px-8 py-4 flex flex-col gap-y-1 bg-gray-800 h-full">
            <div className="flex justify-between items-center">
              <div>
                <DetailRow
                  title="Description"
                  value={bill?.description!}
                ></DetailRow>
                <Spacer y={2} />
                <DetailRow
                  title="Due"
                  value={bill?.due?.toString()!}
                ></DetailRow>
                <Spacer y={2} />
                <div className="font-bold text-base mt-2 md:text-3xl text-teal-500">
                  Payment
                </div>
                {bill?.users.map((u) => (
                  <div key={u.id} className="pt-8 flex flex-row items-center">
                    <div className="font-bold text-base md:text-xl text-teal-500">
                      {u.id}
                    </div>
                    <Spacer x={1} />
                    {u.paid ? (
                      <div className="font-bold text-base md:text-xl text-white">
                        Paid
                      </div>
                    ) : (
                      <div className="font-bold text-base md:text-xl text-white">
                        ${u.amount}
                      </div>
                    )}
                    <Spacer x={2} />
                    <button
                      className={
                        'text-white flex justify-center items-center transition-all bg-teal-500 hover:bg-teal-400 rounded-full px-4 py-2 font-medium h-fit'
                      }
                      onClick={() => onUpload(u.id)}
                    >
                      Upload
                    </button>
                  </div>
                ))}
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
    <div className="flex flex-row">
      <div className="font-bold text-base md:text-xl text-teal-500">
        {title}
      </div>
      <Spacer x={0.5} />
      <div className="font-bold text-base md:text-xl text-white">{value}</div>
    </div>
  );
};

interface UserPaymentProps {
  userName: string;
  amount: string;
  isPaid: boolean;
}
const UserPayment: React.FC<UserPaymentProps> = ({
  userName,
  amount,
  isPaid,
}) => {
  return (
    <div className="flex flex-row">
      <div className="font-bold text-base md:text-xl text-teal-500">
        {userName}
      </div>
      <Spacer x={0.5} />
      {isPaid ? (
        <div className="font-bold text-base md:text-xl text-white">
          {amount}
        </div>
      ) : (
        <div className="font-bold text-base md:text-xl text-white">Paid</div>
      )}
    </div>
  );
};

export default BillDetailPage;
