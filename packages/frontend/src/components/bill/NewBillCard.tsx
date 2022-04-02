import { Button, Textarea } from '@nextui-org/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useMemo, useState } from 'react';
import { useApiMutation } from '../../hooks/useApi';
import { useHouse } from '../../hooks/useHouse';

interface NewBillCardProps {
  refetchOptimisticBills: (bill: any) => void;
  refetchFromApi: () => void;
}

interface IHash {
  [name: string]: number;
}

interface Bill {
  title: string;
  detail: string;
  dueDate: Date;
  totalCost: number;
}

const NewBillCard: React.FC<NewBillCardProps> = ({
  refetchOptimisticBills,
  refetchFromApi,
}) => {
  const [unixTime, setUnixTime] = useState(0);
  const [flatmateNum, setFlatmateNum] = useState(6);
  const { users } = useHouse();
  const [costHash, setCostHash] = useState<IHash>({});
  const [billInfo, setBillInfo] = useState<Bill>({
    title: '',
    detail: '',
    dueDate: new Date(),
    totalCost: 0,
  });

  const createBill = useApiMutation('/api/v1/house/bills', {
    method: 'post',
  });

  useEffect(() => {
    users?.forEach((user) => {
      setCostHash((prev) => ({ ...prev, [user.name]: 0 }));
    });
  }, [users]);

  useEffect(() => {
    setUnixTime(billInfo.dueDate.getTime());
    setFlatmateNum(users?.length ? users.length : 1);
  }, [billInfo, flatmateNum, users?.length]);

  const splitSum = useMemo(
    () => users?.reduce((prev, current) => costHash[current.name] + prev, 0),
    [costHash, users],
  );

  const handleEvenlyButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const split = billInfo.totalCost / flatmateNum;
    users?.forEach((user) => {
      setCostHash((prev) => ({ ...prev, [user.name]: split }));
    });
  };

  const handlePersonalCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCostHash((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const handleDoneButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let bill = {
      name: billInfo.title,
      description: billInfo.detail,
      due: unixTime,
      users: [
        {
          id: users ? users[0].firebaseId : '0',
          amount: users ? costHash[users[0].name] : 0,
          paid: false,
        },
      ],
    };

    users?.forEach((user, index) => {
      let newPayment = {
        id: user.firebaseId,
        amount: costHash[user.name],
        paid: false,
      };
      if (index !== 0) {
        bill['users'].push(newPayment);
      }
    });

    let billBody = {
      body: bill,
    };

    refetchOptimisticBills(bill);
    await createBill(billBody);
    refetchFromApi();
  };

  return (
    <div className="shadow-lg rounded-b-xl min-w-fit">
      <div className="flex flex-col h-full">
        <div className="px-4 pt-6 pb-3 text-lg font-semibold text-left text-white lg:pt-1 lg:pb-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-xl">
          <div className="flex flex-row flex-wrap justify-between mx-4 gap-y-5 gap-x-3 lg:gap-y-0">
            <div className="self-center text-xl">Bill</div>
            <div className="self-center text-base">
              Total Cost: $
              <input
                className="w-7/12 p-1 pl-2 ml-2 text-black rounded-lg appearance-none sm:w-auto"
                type="number"
                value={billInfo.totalCost}
                onChange={(e) =>
                  setBillInfo((prev) => ({
                    ...prev,
                    totalCost: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className="self-center text-base whitespace-nowrap">
              Due Date:
              <DatePicker
                className="p-1 pl-2 ml-2 text-black rounded-lg appearance-none"
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
                className="w-auto h-8 mb-2 text-base sm:my-3"
                onClick={handleDoneButton}
                disabled={Math.abs(billInfo.totalCost - splitSum!) > 0.01}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full px-4 py-4 bg-gray-800 min-w-fit gap-x-4 gap-y-5 rounded-b-xl lg:px-8">
          <div className="flex flex-col w-full text-white sm:flex-wrap sm:justify-between sm:flex-row gap-y-3">
            <div className="flex flex-col gap-y-0.5 sm:w-1/2">
              <div className="mr-3 font-bold">Title</div>
              <input
                className="p-2 text-black rounded-lg appearance-none"
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
            <div className="grid h-4 grid-cols-1 gap-4 mb-12 sm:mb-3 sm:w-2/5">
              {users?.map((person, index) => (
                <div className="font-bold rounded-xl">
                  <div
                    key={index + person.name}
                    className="flex flex-col gap-0.5 whitespace-nowrap text-white"
                  >
                    <span className="text-ellipsis max-w-[2rem]">
                      {person.name}
                    </span>
                    <input
                      className="p-2 text-black rounded-lg appearance-none"
                      type="number"
                      name={person.name}
                      value={costHash[person.name]}
                      onChange={handlePersonalCostChange}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-y-0.5 sm:w-1/2">
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
          </div>

          <Button
            size="xs"
            className="w-auto h-10 p-5 my-3 text-base bg-teal-500 sm:w-1/2"
            onClick={handleEvenlyButton}
          >
            Split Evenly
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewBillCard;
