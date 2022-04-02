import {
  CheckCircleIcon,
  CloudUploadIcon,
  ExternalLinkIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { Button, Spacer } from '@nextui-org/react';
import cx from 'classnames';
import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditIssueCard from '../../components/issue/EditIssueCard';
import Page from '../../components/common/layout/Page';
import { useApi, useApiMutation } from '../../hooks/useApi';
import useFullLoader from '../../hooks/useFullLoader';
import { useHouse } from '../../hooks/useHouse';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useAlert } from '../../components/common/util/CornerAlert';
import { parseFileName } from '../../services/fileNameParser';

const getFirebaseUrl = (proofFileId: string) =>
  'https://firebasestorage.googleapis.com/v0/b/flatshare-c8e5c.appspot.com/o/' +
  proofFileId +
  '?alt=media';

interface IssueDetailPageProps {}

const IssueDetailPage: React.FC<IssueDetailPageProps> = () => {
  const { id } = useParams();

  const {
    data: issue,
    loading: issueLoading,
    mutate: issueMutate,
  } = useApi('/api/v1/house/issues/{id}', {
    method: 'get',
    pathParams: { id: id ?? '' },
  });

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState<File | null | undefined>(undefined);
  const [resolvedState, setResolvedState] = useState(false);
  const { createAlert, resetAlert } = useAlert();

  const navigate = useNavigate();
  const auth = getAuth();

  // mark pay with and without proof
  const markIssueResolved = useApiMutation(
    '/api/v1/house/issues/{id}/resolve',
    {
      method: 'put',
    },
  );

  // delete issue
  const deleteIssueCall = useApiMutation('/api/v1/house/issues/{id}', {
    method: 'delete',
  });

  // edit issue
  const editIssueCall = useApiMutation('/api/v1/house/issues/{id}', {
    method: 'put',
  });

  useFullLoader(() => issueLoading);

  if (issueLoading || !issue) {
    return null;
  }

  const userId = auth.currentUser?.uid;
  const isOwner = userId === issue?.logger;

  const completeIssue = async () => {
    if (resolvedState) {
      return;
    }

    const optimistic = { ...issue };
    setResolvedState(!resolvedState);
    issueMutate(optimistic);

    await markIssueResolved({
      pathParams: {
        id: issue.id,
      },
      body: {
        resolved: true,
      },
    });
  };

  const deleteIssue = async () => {
    deleteIssueCall({ pathParams: { id: issue.id } });
    navigate('/issues', { replace: true });
  };

  const fileNotAttached = image === null || image === undefined;

  const onUpload = async () => {
    // Create a root reference
    const storage = getStorage();
    const fileName = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    const storageRef = ref(storage, fileName);

    createAlert({
      icon: <CloudUploadIcon />,
      message: 'Your proof is being uploaded!',
      mode: 'info',
    });

    uploadBytes(storageRef, image!, {}).then(async (snapshot) => {
      const optimistic = { ...issue };
      await uploadProof(fileName);
      issue.image = fileName;
      issueMutate(optimistic);
      resetAlert();
    });
  };

  const uploadProof = async (proof: string) => {
    await editIssueCall({
      pathParams: {
        id: issue.id,
      },
      body: {
        name: issue.name,
        image: proof,
        description: issue.description,
        resolved: issue.resolved,
      },
    });
  };

  return (
    <Page backpath="/issues">
      {isEdit ? (
        <div className="px-10 pt-10 md:px-20">
          <EditIssueCard
            issueParam={issue}
            handleOnDoneClickCallBack={(d) => {
              editIssueCall({
                pathParams: {
                  id: issue.id,
                },
                body: {
                  description: d.description,
                  name: d.name,
                  resolved: d.resolved,
                  image: d.image,
                },
              });
              navigate('/issues');
            }}
          />
        </div>
      ) : (
        <div className="sm:p-20 min-w-fit">
          <div className="shadow-lg rounded-b-xl">
            <div className="flex flex-col h-full">
              <div
                className={cx(
                  'bg-gradient-to-r from-blue-500 to-teal-700',
                  'flex flex-row text-left items-center justify-between rounded-t-xl px-10 py-6 text-white font-semibold text-2xl lg:text-3xl',
                )}
              >
                {issue?.name}
                <div className="flex flex-row flex-wrap ml-10 sm:items-center gap-x-3 gap-y-3 sm:gap-x-5 sm:flex-nowrap">
                  <Button
                    className="text-base rounded-lg"
                    auto
                    onClick={() => completeIssue()}
                  >
                    {resolvedState ? (
                      <div className="flex">
                        <CheckCircleIcon className="w-8 p-1" />
                        Resolved
                      </div>
                    ) : (
                      'Resolve'
                    )}
                  </Button>
                  {isOwner ? (
                    <Button
                      auto
                      className="rounded-lg"
                      onClick={() => setIsEdit(!isEdit)}
                      icon={<PencilIcon className="w-5 h-5 text-teal-50" />}
                    />
                  ) : (
                    <></>
                  )}
                  {isOwner ? (
                    <Button
                      auto
                      className="rounded-lg"
                      onClick={() => deleteIssue()}
                      icon={<TrashIcon className="w-5 h-5 text-teal-50" />}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex flex-col h-full px-4 py-4 bg-gray-800 rounded-b-xl md:px-8 gap-y-1">
                <div className="flex flex-col items-start justify-between py-6 pl-5 md:flex-row md:w-full">
                  <div className="flex flex-col px-2 lg:w-1/2">
                    <DetailRow
                      title="Description"
                      value={issue?.description!}
                    />
                    <Spacer y={2} />
                    <DetailRow
                      title="Log Date"
                      value={
                        issue?.loggedDate
                          ? new Date(issue.loggedDate).toDateString()
                          : ''
                      }
                    />
                    <Spacer y={2} />
                  </div>
                  <div className="flex flex-col px-2 md:w-1/2">
                    <div className="text-xl font-bold text-teal-500">
                      Issued By
                    </div>
                    <div className="flex flex-col">
                      <UserRow key={userId} userId={userId} />
                    </div>
                    <Spacer y={2} />
                    <div className="text-xl font-bold text-teal-500">
                      {issue.image && (
                        <button
                          className="flex items-center font-bold rounded-md hover:bg-gray-500"
                          onClick={() => {
                            const proofImageLink = getFirebaseUrl(issue.image);
                            window.open(proofImageLink, '_blank');
                          }}
                        >
                          Proof
                          <ExternalLinkIcon className="w-5 mt-1 ml-1" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center self-end justify-end px-2 mb-4">
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center px-4 py-2 font-medium text-white transition-all bg-teal-500 rounded-lg w-28 bold hover:bg-teal-400 h-fit"
                  >
                    <input
                      id="file-upload"
                      hidden
                      type={'file'}
                      onChange={(e) => {
                        setImage(e.currentTarget.files?.item(0));
                      }}
                    ></input>
                    <span className="max-w-xs overflow-hidden text-right text-clip">
                      {image ? parseFileName(image.name) : 'Select File'}
                    </span>
                  </label>
                  <Spacer x={1} />
                  <button
                    className={cx(
                      ' flex justify-center items-center transition-all rounded-lg px-4 w-28 py-2 font-medium h-fit',
                      {
                        'text-white bg-teal-500 hover:bg-teal-400':
                          !fileNotAttached,
                        'text-gray-300 bg-gray-500': fileNotAttached,
                      },
                    )}
                    onClick={() => onUpload()}
                    disabled={fileNotAttached}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
};

interface DetailRowProps {
  title: string;
  value: string;
}
const DetailRow: React.FC<DetailRowProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col items-start">
      <div className="text-xl font-bold text-teal-500 md:text-xl">{title}</div>
      <div className="py-2 text-base font-bold text-white md:text-xl">
        {value}
      </div>
    </div>
  );
};
interface UserRowProp {
  userId: string | undefined;
}

const UserRow: React.FC<UserRowProp> = ({ userId }) => {
  const house = useHouse();

  const getUserFromId = (uid: string | undefined) => {
    return house.users?.find((u) => u.firebaseId === uid)?.name;
  };
  return (
    <div key={userId} className="flex flex-col items-start w-full py-2">
      <div className="text-base font-bold text-white md:text-xl">
        {getUserFromId(userId)}
      </div>
    </div>
  );
};

export default IssueDetailPage;
