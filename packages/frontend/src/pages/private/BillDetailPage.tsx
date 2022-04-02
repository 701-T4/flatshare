import {
  CheckCircleIcon,
  CloudUploadIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { Button, Spacer } from '@nextui-org/react';
import cx from 'classnames';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import EditBillCard from '../../components/bill/EditBillCard';
import Page from '../../components/common/layout/Page';
import { useApi, useApiMutation } from '../../hooks/useApi';
import useFullLoader from '../../hooks/useFullLoader';
import { useHouse } from '../../hooks/useHouse';
import { components } from '../../types/api-schema';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { useAlert } from '../../components/common/util/CornerAlert';
import { parseFileName } from '../../services/fileNameParser';

const getFirebaseUrl = (proofFileId: string) =>
  'https://firebasestorage.googleapis.com/v0/b/flatshare-c8e5c.appspot.com/o/' +
  proofFileId +
  '?alt=media';

interface BillDetailPageProps {}

const BillDetailPage: React.FC<BillDetailPageProps> = () => {
  const { id } = useParams();

  // const bill = stateWrapper.bill;
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState<File | null | undefined>(undefined);
  const navigate = useNavigate();
  const auth = getAuth();
  const { createAlert, resetAlert } = useAlert();

  const {
    data: bill,
    loading: billLoading,
    mutate: billMutate,
  } = useApi('/api/v1/house/bills/{id}', {
    method: 'get',
    pathParams: { id: id ?? '' },
  });

  // mark pay with and without proof
  const markPayBill = useApiMutation('/api/v1/house/bills/{id}/payment', {
    method: 'put',
  });

  // delete bill
  const deleteBillCall = useApiMutation('/api/v1/house/bills/{id}', {
    method: 'delete',
  });

  // edit bill
  const editBillCall = useApiMutation('/api/v1/house/bills/{id}', {
    method: 'put',
  });

  useFullLoader(() => billLoading);

  if (billLoading || !bill) {
    return null;
  }

  const userId = auth.currentUser?.uid;
  const paid = bill.users.find((u) => u.id === userId)?.paid;

  const isOwner = userId === bill?.owner;

  // upload to firebase
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
      const optimistic = { ...bill };
      bill.users.find((u) => u.id === userId)!.proof = getFirebaseUrl(fileName);
      billMutate(optimistic);
      await uploadProof(fileName);
      resetAlert();
    });
  };

  const completeBill = async () => {
    if (paid) {
      return;
    }

    const optimistic = { ...bill };
    bill.users.find((u) => u.id === userId)!.paid = true;
    billMutate(optimistic);

    await markPayBill({
      pathParams: {
        id: bill.id,
      },
      body: {
        paid: true,
        proof: undefined,
      },
    });
  };

  const uploadProof = async (proof: string) => {
    await markPayBill({
      pathParams: {
        id: bill.id,
      },
      body: {
        paid: true,
        proof: proof,
      },
    });
  };

  const deleteBill = async () => {
    deleteBillCall({ pathParams: { id: bill.id } });
    navigate('/bills', { replace: true });
  };

  const fileNotAttached = image === null || image === undefined;

  return (
    <Page>
      {isEdit ? (
        <div className="px-10 pt-10 md:px-20">
          <EditBillCard
            billParam={bill}
            handleOnDoneClickCallBack={(d) => {
              editBillCall({
                pathParams: {
                  id: bill.id,
                },
                body: { description: d.description, name: d.name },
              });
              navigate('/bills');
            }}
          />
        </div>
      ) : (
        <div className="px-10 pt-10 md:px-20">
          <div className="shadow-lg rounded-b-xl">
            <div className="flex flex-col h-full">
              <div
                className={cx(
                  'bg-gradient-to-r from-red-400 to-red-600', //TODO to be extracted
                  'flex flex-row text-left items-center justify-between rounded-t-xl px-10 py-10 text-white font-semibold lg:text-3xl',
                )}
              >
                {bill?.name}
                <div className="flex flex-row items-center">
                  {/* <Switch className="mr-5"></Switch> */}
                  <Button auto onClick={() => completeBill()}>
                    {paid ? (
                      <div className="flex">
                        <CheckCircleIcon className="w-8 p-1" />
                        Paid
                      </div>
                    ) : (
                      'Complete'
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
                      onClick={() => deleteBill()}
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
                    <DetailRow title="Description" value={bill?.description!} />
                    <Spacer y={2} />
                    <DetailRow
                      title="Due"
                      value={new Date(bill.due).toDateString()}
                    />
                    <Spacer y={2} />
                  </div>
                  <div className="flex flex-col px-2 lg:w-1/2">
                    <div className="text-3xl font-bold text-teal-500">
                      Payment
                    </div>
                    <div className="flex flex-col">
                      {bill.users.map((u) => (
                        <UserRow key={u.id} u={u} userId={userId} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center self-end justify-end">
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center px-4 py-2 font-medium text-white transition-all bg-teal-500 rounded-full bold hover:bg-teal-400 h-fit"
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
                      ' flex justify-center items-center transition-all  rounded-full px-4 py-2 font-medium h-fit',
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
  u: components['schemas']['BillUser'];
  userId: string | undefined;
}

const UserRow: React.FC<UserRowProp> = ({ u, userId }) => {
  const house = useHouse();

  const getUserFromId = (uid: String) => {
    console.log(u);

    console.log(house.users);
    return house.users?.find((u) => u.firebaseId === uid)?.name;
  };

  const proofFileId = u.proof;

  return (
    <div key={u.id} className="flex flex-col items-start w-full py-2">
      <div className="text-base font-bold text-white md:text-xl">
        {getUserFromId(u.id)}
      </div>
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-row text-base font-bold text-white md:text-2xl">
          {u.paid ? <>Paid - </> : <>${u.amount}</>}
          {proofFileId && (
            <div className="flex flex-row">
              <button
                className="flex flex-row items-center justify-center w-20 ml-1 font-semibold text-white rounded-md hover:bg-gray-500"
                onClick={() => {
                  const proofFileLink = getFirebaseUrl(proofFileId);
                  window.open(proofFileLink, '_blank');
                }}
              >
                Proof
                <ExternalLinkIcon className="w-5 mt-1" />
              </button>
            </div>
          )}
        </div>
        {userId === u.id ? <></> : <div className=""></div>}
      </div>
    </div>
  );
};

export default BillDetailPage;
