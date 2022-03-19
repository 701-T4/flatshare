import { Button, Textarea } from '@nextui-org/react';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import { components } from '../../types/api-schema';

interface billModification {
  name: string;
  description: string;
}

interface EditBillCardProps {
  billParam: components['schemas']['BillResponseDto'];
  handleOnDoneClickCallBack: React.Dispatch<billModification>;
}

const EditBillCard: React.FC<EditBillCardProps> = ({
  billParam,
  handleOnDoneClickCallBack,
}) => {
  const [title, setTitle] = useState(billParam.name);
  const [detail, setDetail] = useState(billParam.description);

  const handleDoneButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    let bill = {
      name: title,
      description: detail,
    };
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
