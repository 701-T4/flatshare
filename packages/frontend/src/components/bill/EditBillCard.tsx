import { Button, Textarea } from '@nextui-org/react';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';
import { useHouse } from '../../hooks/useHouse';
import { components } from '../../types/api-schema';

interface EditBillCardProps {
  billParam: components['schemas']['BillResponseDto'];
  handleOnDoneClickCallBack: React.Dispatch<
    components['schemas']['BillResponseDto']
  >;
}

interface IHash {
  [name: string]: string;
}

const EditBillCard: React.FC<EditBillCardProps> = ({
  billParam,
  handleOnDoneClickCallBack,
}) => {
  const [dueDate, setDueDate] = useState(new Date());
  const [unixTime, setUnixTime] = useState(0);
  const [totalCost, setTotalCost] = useState('');
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [flatmateNum, setFlatmateNum] = useState(6);
  const [splitCost, setSplitCost] = useState('');
  const [isEvenlySplit, setIsEvenlySplit] = useState(false);
  const { users } = useHouse();

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

  const handleDoneButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    let bill = {
      id: billParam.id,
      name: title,
      description: detail,
      due: unixTime,
      owner: billParam.owner,
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
    });

    handleOnDoneClickCallBack(bill);
  };

  return (
    <div className="shadow-lg rounded-b-xl">
      <div className="flex flex-col h-full">
        <div className="px-4 py-1 text-lg font-semibold text-left text-white bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-xl">
          <div className="flex flex-row flex-wrap justify-between">
            <div className="self-center">Bill</div>

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
      </div>
      <div className="flex flex-col align-items-center text-white bg-gray-800 rounded-b-xl lg:px-8">
        <div className="flex flex-row justify-items-center">
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
      </div>
    </div>
  );
};

export default EditBillCard;
