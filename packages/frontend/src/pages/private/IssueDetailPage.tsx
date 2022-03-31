import {
  CheckCircleIcon,
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

// const getFirebaseUrl = (proofFileId: string) =>
//   'https://firebasestorage.googleapis.com/v0/b/flatshare-c8e5c.appspot.com/o/' +
//   proofFileId +
//   '?alt=media';

interface IssueDetailPageProps {}

const IssueDetailPage: React.FC<IssueDetailPageProps> = () => {
  const { id } = useParams();

  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const {
    data: issue,
    loading: issueLoading,
    mutate: issueMutate,
  } = useApi('/api/v1/house/issues/{id}', {
    method: 'get',
    pathParams: { id: id ?? '' },
  });

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
  const resolved = issue?.resolved;
  const isOwner = userId === issue?.logger;

  const completeIssue = async () => {
    if (resolved) {
      return;
    }

    const optimistic = { ...issue };
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

  return (
    <Page>
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
                },
              });
              navigate('/issues');
            }}
          />
        </div>
      ) : (
        <div className="px-10 pt-10 md:px-20">
          <div className="shadow-lg rounded-b-xl">
            <div className="flex flex-col h-full">
              <div
                className={cx(
                  'bg-gradient-to-r from-blue-500 to-teal-700',
                  'flex flex-row text-left items-center justify-between rounded-t-xl px-10 py-10 text-white font-semibold lg:text-3xl',
                )}
              >
                {issue?.name}
                <div className="flex flex-row items-center">
                  {/* <Switch className="mr-5"></Switch> */}
                  <Button auto onClick={() => completeIssue()}>
                    {resolved ? (
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
                      className="mx-5"
                      onClick={() => setIsEdit(!isEdit)}
                      icon={<PencilIcon className="w-5 h-5 text-teal-50" />}
                    />
                  ) : (
                    <></>
                  )}
                  {isOwner ? (
                    <Button
                      auto
                      onClick={() => deleteIssue()}
                      icon={<TrashIcon className="w-5 h-5 text-teal-50" />}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center h-full px-4 py-4 bg-gray-800 rounded-b-xl lg:px-8 gap-y-1">
                <div className="flex flex-col items-start justify-between lg:flex-row lg:w-full">
                  <div className="flex flex-col px-2 lg:w-1/2">
                    <DetailRow
                      title="Description"
                      value={issue?.description!}
                    />
                    <Spacer y={2} />
                    <DetailRow
                      title="Log Date"
                      value={new Date(issue?.loggedDate).toDateString()}
                    />
                    <Spacer y={2} />
                  </div>
                  <div className="flex flex-col px-2 lg:w-1/2">
                    <div className="text-3xl font-bold text-teal-500">
                      Issued By
                    </div>
                    <div className="flex flex-col">
                      <UserRow key={userId} userId={userId} />
                    </div>
                  </div>
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
      <div className="text-base font-bold text-teal-500 md:text-3xl">
        {title}
      </div>
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
    console.log(house.users);
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
