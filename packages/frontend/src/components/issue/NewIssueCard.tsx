import { Button, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import { useApiMutation } from '../../hooks/useApi';
import emailjs from '@emailjs/browser';
import { useHouse } from '../../hooks/useHouse';
import { parseFileName } from '../../services/fileNameParser';
import { getStorage, ref, uploadBytes, UploadResult } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { CloudUploadIcon } from '@heroicons/react/outline';
import { useAlert } from '../../components/common/util/CornerAlert';

interface NewIssueCardProps {
  refetchOptimisticIssues: (issue: any) => void;
  refetchFromApi: () => void;
}

interface Issue {
  title: string;
  detail: string;
  resolved: boolean;
  image: File | null | undefined;
}

const NewIssueCard: React.FC<NewIssueCardProps> = ({
  refetchOptimisticIssues,
  refetchFromApi,
}) => {
  const [issueInfo, setIssueInfo] = useState<Issue>({
    title: '',
    detail: '',
    resolved: false,
    image: undefined,
  });
  const { code, email } = useHouse();

  const createIssue = useApiMutation('/api/v1/house/issues', {
    method: 'post',
  });

  const { createAlert } = useAlert();

  const handleDoneButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const issue = {
      name: issueInfo.title,
      description: issueInfo.detail,
      resolved: issueInfo.resolved,
      image: '',
    };

    let issueBody = {
      body: issue,
    };

    if (issueInfo.image) {
      createAlert({
        icon: <CloudUploadIcon />,
        message: 'Wait while image is being uploaded!',
        mode: 'info',
      });

      try {
        issue.image = (await uploadImage()).ref.name;

        createAlert({
          icon: <CloudUploadIcon />,
          message: 'Upload Success!',
          mode: 'info',
        });
      } catch (err) {
        createAlert({
          icon: <CloudUploadIcon />,
          message: 'Image upload failed',
          mode: 'info',
        });
      }
    }

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

    setIssueInfo({
      title: '',
      detail: '',
      resolved: false,
      image: undefined,
    });
  };

  const uploadImage = async (): Promise<UploadResult> => {
    const storage = getStorage();
    const fileName = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    const storageRef = ref(storage, fileName);

    return uploadBytes(storageRef, issueInfo.image!, {});
  };

  return (
    <div className="shadow-lg rounded-b-xl">
      <div className="flex flex-col h-full">
        <div className="px-8 py-3 text-lg font-semibold text-left text-white bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-xl">
          <div className="flex flex-row flex-wrap justify-between">
            <div className="self-center text-2xl">Issue</div>
            <div className="self-end">
              <Button
                size="xs"
                css={{
                  zIndex: 0,
                }}
                className="w-auto h-10 mt-1 mb-1 text-base rounded-xl"
                onClick={handleDoneButton}
                disabled={issueInfo.title === '' || issueInfo.detail === ''}
              >
                Done
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-row h-full px-4 py-4 bg-gray-800 gap-x-4 rounded-b-xl lg:px-8">
          <div className="flex flex-col flex-grow my-4 text-white gap-y-5">
            <div className="flex flex-col gap-y-1">
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
            <div className="flex flex-col gap-y-1">
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
            <div className="flex flex-col gap-y-3">
              <div className="font-bold">Image</div>
              <label
                htmlFor="file-upload"
                className="flex justify-center px-4 py-2 font-medium text-white transition-all bg-teal-500 cursor-pointer rounded-xl bold hover:bg-teal-400 h-fit w-fit"
              >
                <input
                  id="file-upload"
                  hidden
                  type={'file'}
                  onChange={(e) => {
                    setIssueInfo((prev) => ({
                      ...prev,
                      image: e.currentTarget.files?.item(0),
                    }));
                  }}
                ></input>
                <span className="max-w-xs overflow-hidden text-right text-clip">
                  {issueInfo.image
                    ? parseFileName(issueInfo.image.name)
                    : 'Select File'}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewIssueCard;
