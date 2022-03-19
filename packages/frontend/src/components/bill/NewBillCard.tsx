import { Button, Input, Textarea } from '@nextui-org/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';
import { useApi, useApiMutation } from '../../hooks/useApi';
import { useHouse } from '../../hooks/useHouse';
import { json } from 'stream/consumers';

const FlatMates = [
  {
    name: 'Samuel',
  },
  {
    name: 'David',
  },
  {
    name: 'Owen',
  },
  {
    name: 'Owen',
  },
  {
    name: 'Owen',
  },
  {
    name: 'Owen',
  },
  {
    name: 'Owen',
  },
  {
    name: 'Owen',
  },
];

interface NewBillCardProps {
  title?: string;
  detail?: string;
  due?: Long;
}

interface IHash {
  [name: string]: string;
}

const NewBillCard: React.FC<NewBillCardProps> = () => {
  const [dueDate, setDueDate] = useState(new Date());
  const [unixTime, setUnixTime] = useState(0);
  const [totalCost, setTotalCost] = useState('');
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [flatmateNum, setFlatmateNum] = useState(6);
  const [splitCost, setSplitCost] = useState('');
  const [isEvenlySplit, setIsEvenlySplit] = useState(false);
  const { users } = useHouse();
  const createBill = useApiMutation('/api/v1/house/bills', {
    method: 'post',
  });

  let idHash: IHash = {};
  let costHash: IHash = {};
  users?.map((user) => {
    idHash[user.name] = user.firebaseId;
    costHash[user.name] = '0';
  });

  useEffect(() => {
    setUnixTime(dueDate.getTime());
    setFlatmateNum(users?.length ? users.length : 1);
    setSplitCost(Number(totalCost) / flatmateNum + '');

    // to convert unix date to Date object
    // const dateObject = new Date(unixDate)
  }, [dueDate, totalCost]);

  console.log(users);

  const handleEvenlyButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsEvenlySplit(!isEvenlySplit);
    console.log(splitCost);
  };
  const handlePersonalCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    costHash[e.target.name] = e.target.value;
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(idHash[e.target.name]);
  };
  const handleDoneButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    let bill = {
      name: title,
      description: detail,
      due: unixTime,
      users: [
        {
          id: users ? users[0].firebaseId : '0',
          amount: users ? Number(costHash[users[0].name]) : 0,
          paid: false,
        },
      ],
    };
    users?.map((user, index) => {
      let newPayment = {
        id: user.firebaseId,
        amount: Number(costHash[user.name]),
        paid: false,
      };
      if (index != 0) {
        bill['users'].push(newPayment);
      }
    });
    let billBody = {
      body: bill,
    };

    const response = createBill(billBody);
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
                className="appearance-none  rounded-lg pl-1 ml-2 h-5 w-[10rem] text-black"
                type="number"
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
              />
            </div>
            <div className="self-center whitespace-nowrap">
              Due Date:
              <DatePicker
                className="appearance-none  rounded-lg pl-1 ml-2 h-5 w-[10rem] text-black"
                selected={dueDate}
                onChange={(date: Date) => setDueDate(date)}
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
                className="appearance-none  rounded-lg pl-3  h-5 w-[12rem] text-black self-center"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-items-center">
              <div className="self-center mr-3">Details</div>
              <Textarea
                size="lg"
                animated={false}
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              ></Textarea>
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
          <div className="flex flex-wrap gap-5 ml-4">
            {users?.map((person, index) => {
              return (
                <div className="p-4 font-bold bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl self-center w-[15rem]">
                  <div
                    key={index + person.name}
                    className="flex self-center justify-between text-white"
                  >
                    {person.name}
                    <input
                      className="appearance-none  rounded-lg pl-1 ml-2 h-5 w-[9rem] text-black self-center "
                      type="text"
                      name={person.name}
                      value={isEvenlySplit ? splitCost : undefined}
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
