import { Button, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import { useApiMutation } from '../../hooks/useApi';
import emailjs from '@emailjs/browser';
import { useHouse } from '../../hooks/useHouse';

interface NewIssueCardProps {
  refetchOptimisticIssues: (issue: any) => void;
  refetchFromApi: () => void;
}

interface Issue {
  title: string;
  detail: string;
  resolved: boolean;
}

const NewIssueCard: React.FC<NewIssueCardProps> = ({
  refetchOptimisticIssues,
  refetchFromApi,
}) => {
  const [issueInfo, setIssueInfo] = useState<Issue>({
    title: '',
    detail: '',
    resolved: false,
  });
  const { code, email } = useHouse();

  const createIssue = useApiMutation('/api/v1/house/issues', {
    method: 'post',
  });

  const handleDoneButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let issue = {
      name: issueInfo.title,
      description: issueInfo.detail,
      resolved: issueInfo.resolved,
      image: '',
    };

    let issueBody = {
      body: issue,
    };

    refetchOptimisticIssues(issue);
    await createIssue(issueBody);
    refetchFromApi();

    let emailData = {
      houseCode: code,
      title: issueInfo.title,
      description: issueInfo.detail,
      toEmail: email,
    };

    const serviceID = 'default_service';
    const templateID = 'template_sgoanfq';
    const userID = process.env.REACT_APP_EMAILJS_USER_ID;

    emailjs.send(serviceID, templateID, emailData, userID).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
      },
      function (error) {
        console.log('FAILED...', error);
      },
    );
  };

  return (
    <div className="shadow-lg rounded-b-xl">
      <div className="flex flex-col h-full">
        <div className="px-4 py-1 text-lg font-semibold text-left text-white bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-xl">
          <div className="flex flex-row flex-wrap justify-between">
            <div className="self-center">Issue</div>
            <div className="self-end">
              <Button
                size="xs"
                rounded
                className="w-auto h-10 mt-1 mb-1 text-base"
                onClick={handleDoneButton}
                disabled={issueInfo.title === '' || issueInfo.detail === ''}
              >
                Done
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-row h-full px-4 py-4 bg-gray-800 gap-x-4 rounded-b-xl lg:px-8">
          <div className="flex flex-col flex-grow mb-1 text-white gap-y-3">
            <div className="flex flex-col gap-y-0.5">
              <div className="mr-3 font-bold">Title</div>
              <input
                className="p-2 text-black rounded-lg appearance-none"
                type="text"
                placeholder="e.g. The sink exploded"
                value={issueInfo.title}
                onChange={(e) =>
                  setIssueInfo((prev) => ({
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
                value={issueInfo.detail}
                placeholder="Details could include what happened, who has been contacted, what needs to be done..."
                onChange={(e) =>
                  setIssueInfo((prev) => ({
                    ...prev,
                    detail: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewIssueCard;
