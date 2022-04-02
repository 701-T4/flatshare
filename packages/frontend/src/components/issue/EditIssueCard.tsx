import { Button, Textarea } from '@nextui-org/react';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import { components } from '../../types/api-schema';

interface issueModification {
  name: string;
  description: string;
  resolved: boolean;
  image: string;
}

interface EditIssueCardProps {
  issueParam: components['schemas']['IssueResponseDto'];
  handleOnDoneClickCallBack: React.Dispatch<issueModification>;
}

const EditIssueCard: React.FC<EditIssueCardProps> = ({
  issueParam,
  handleOnDoneClickCallBack,
}) => {
  const [title, setTitle] = useState(issueParam.name);
  const [detail, setDetail] = useState(issueParam.description);

  const handleDoneButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    let issue = {
      name: title,
      description: detail,
      resolved: issueParam.resolved,
      image: issueParam.image,
    };
    handleOnDoneClickCallBack(issue);
  };

  return (
    <div className="shadow-lg rounded-b-xl">
      <div className="flex flex-col h-full">
        <div className="px-4 py-1 text-lg font-semibold text-left text-white bg-gradient-to-r from-blue-500 to-teal-700 rounded-t-xl">
          <div className="flex flex-row flex-wrap justify-between">
            <div className="self-center">Issue</div>

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
      <div className="flex flex-col align-items-center p-4 text-white bg-gray-800 rounded-b-xl lg:px-8">
        <div className="flex flex-col justify-items-start align-items-start">
          <div className="mr-3 ">Title</div>
          <Textarea
            maxRows={1}
            className="appearance-none w-full rounded-lg text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-items-start align-items-start">
          <div className="mr-3">Details</div>
          <Textarea
            size="lg"
            className="w-full"
            animated={false}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          ></Textarea>
        </div>
      </div>
    </div>
  );
};

export default EditIssueCard;
