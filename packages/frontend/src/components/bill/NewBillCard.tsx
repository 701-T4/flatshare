import { Button, Textarea } from '@nextui-org/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';
import { useApiMutation } from '../../hooks/useApi';
import { useHouse } from '../../hooks/useHouse';

interface NewBillCardProps {}

interface IHash {
  [name: string]: string;
}

interface Bill {
  title: string;
  detail: string;
  dueDate: Date;
  totalCost: string;
}

const NewBillCard: React.FC<NewBillCardProps> = () => {
  const [unixTime, setUnixTime] = useState(0);
  const [flatmateNum, setFlatmateNum] = useState(6);
  const [splitCost, setSplitCost] = useState('');
  const [isEvenlySplit, setIsEvenlySplit] = useState(false);
  const { users } = useHouse();
  const [billInfo, setBillInfo] = useState<Bill>({
    title: ' ',
    detail: '',
    dueDate: new Date(),
    totalCost: '0',
  });

  const createBill = useApiMutation('/api/v1/house/bills', {
    method: 'post',
  });

  let idHash: IHash = {};
  let costHash: IHash = {};
  users?.forEach((user) => {
    idHash[user.name] = user.firebaseId;
    costHash[user.name] = '0';
  });

  useEffect(() => {
    setUnixTime(billInfo.dueDate.getTime());
    setFlatmateNum(users?.length ? users.length : 1);
    setSplitCost(Number(billInfo.totalCost) / flatmateNum + '');
  }, [billInfo, flatmateNum, users?.length]);

  const handleEvenlyButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsEvenlySplit(!isEvenlySplit);
  };

  const handlePersonalCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    costHash[e.target.name] = e.target.value;
  };

  const handleDoneButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    let bill = {
      name: billInfo.title,
      description: billInfo.detail,
      due: unixTime,
      users: [
        {
          id: users ? users[0].firebaseId : '0',
          amount: users
            ? Number(isEvenlySplit ? splitCost : costHash[users[0].name])
            : 0,
          paid: false,
        },
      ],
    };

    users?.forEach((user, index) => {
      let newPayment = {
        id: user.firebaseId,
        amount: Number(isEvenlySplit ? splitCost : costHash[user.name]),
        paid: false,
      };
      if (index !== 0) {
        bill['users'].push(newPayment);
      }
    });

    let billBody = {
      body: bill,
    };

    createBill(billBody);
  };

  return (
    <div className="shadow-lg rounded-b-xl">
      <div className="flex flex-col h-full">
        <div className="px-4 py-1 text-lg font-semibold text-left text-white bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-xl">
          <div className="flex flex-row flex-wrap justify-between">
            <div className="self-center">Bill</div>
            <div className="self-center">
              Total Cost: $
              <input
                className="appearance-none rounded-lg p-1 pl-2 ml-2 text-black"
                type="number"
                value={billInfo.totalCost}
                onChange={(e) =>
                  setBillInfo((prev) => ({
                    ...prev,
                    totalCost: e.target.value,
                  }))
                }
              />
            </div>
            <div className="self-center whitespace-nowrap">
              Due Date:
              <DatePicker
                className="appearance-none rounded-lg p-1 pl-2 ml-2 text-black"
                selected={billInfo.dueDate}
                dateFormat="MMMM d, yyyy"
                onChange={(date: Date) =>
                  setBillInfo((prev) => ({
                    ...prev,
                    dueDate: date,
                  }))
                }
              />
            </div>
            <div className="self-end">
              <Button
                size="xs"
                rounded
                className="w-auto h-10 mt-1 mb-1 text-base"
                onClick={handleDoneButton}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-x-4 h-full px-4 py-4 bg-gray-800 rounded-b-xl lg:px-8">
          <div className="flex flex-col flex-grow text-white gap-y-3">
            <div className="flex flex-col gap-y-0.5">
              <div className="mr-3 font-bold">Title</div>
              <input
                className="appearance-none rounded-lg p-2 text-black"
                type="text"
                value={billInfo.title}
                onChange={(e) =>
                  setBillInfo((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-y-0.5">
              <div className="font-bold">Details</div>
              <Textarea
                size="lg"
                animated={false}
                value={billInfo.detail}
                onChange={(e) =>
                  setBillInfo((prev) => ({
                    ...prev,
                    detail: e.target.value,
                  }))
                }
              />
            </div>
            <Button
              size="xs"
              rounded
              className="w-auto h-10 p-5 mt-1 mb-1 text-base"
              onClick={handleEvenlyButton}
              flat={isEvenlySplit}
            >
              Split Evenly
            </Button>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 h-4 ml-4">
            {users?.map((person, index) => (
              <div className=" font-bold rounded-xl">
                <div
                  key={index + person.name}
                  className="flex flex-col gap-0.5 whitespace-nowrap text-white"
                >
                  <span className="text-ellipsis max-w-[2rem]">
                    {person.name}
                  </span>
                  <input
                    className="appearance-none p-2 rounded-lg text-black"
                    type="number"
                    name={person.name}
                    value={isEvenlySplit ? splitCost : undefined}
                    onChange={handlePersonalCostChange}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBillCard;
