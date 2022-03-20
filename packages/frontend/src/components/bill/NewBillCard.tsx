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
  users?.map((user) => {
    idHash[user.name] = user.firebaseId;
    costHash[user.name] = '0';
    return 0;
  });

  useEffect(() => {
    setUnixTime(billInfo.dueDate.getTime());
    setFlatmateNum(users?.length ? users.length : 1);
  }, [billInfo, flatmateNum, users?.length, isEvenlySplit]);

  const handleEvenlyButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSplitCost(Number(billInfo.totalCost) / flatmateNum + '');
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

    users?.map((user, index) => {
      let newPayment = {
        id: user.firebaseId,
        amount: Number(isEvenlySplit ? splitCost : costHash[user.name]),
        paid: false,
      };
      if (index !== 0) {
        bill['users'].push(newPayment);
      }
      return 0;
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
                className="appearance-none  rounded-lg p-4 pl-1 ml-2 h-5 w-[10rem] text-black"
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
                className="appearance-none  rounded-lg p-4 pl-1 ml-2 h-5 w-[10rem] text-black"
                selected={billInfo.dueDate}
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
        <div className="flex flex-row justify-between h-full px-4 py-4 bg-gray-800 rounded-b-xl lg:px-8">
          <div className="flex flex-col text-white gap-y-3">
            <div className="flex flex-row justify-between">
              <div className="self-center mr-3 ml-4">Title</div>
              <input
                className="appearance-none  rounded-lg  p-4 pl-3  h-5 w-[12rem] text-black self-center"
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
            <div className="flex flex-row justify-items-center">
              <div className="self-center mr-3">Details</div>
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
              ></Textarea>
            </div>
            <Button
              size="xs"
              rounded
              className="w-auto h-10 p-5 mt-1 mb-1 text-base"
              onClick={handleEvenlyButton}
            >
              Split Evenly
            </Button>
          </div>
          <div className="flex flex-wrap gap-5 ml-4">
            {users?.map((person, index) => {
              return (
                <div className="p-4  rounded-xl self-center w-[15rem]">
                  <div
                    key={index + person.name}
                    className="flex self-center justify-between text-white"
                  >
                    <div className="whitespace-nowrap self-center ">
                      {person.name}
                    </div>

                    <input
                      className="appearance-none  rounded-lg p-5 pl-1 ml-2 h-5 w-[9rem] text-black  "
                      type="text"
                      name={person.name}
                      value={splitCost}
                      onChange={handlePersonalCostChange}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBillCard;
