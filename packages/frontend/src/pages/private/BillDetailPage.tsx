import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
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

interface BillDetailPageProps {}

const BillDetailPage: React.FC<BillDetailPageProps> = () => {
  const { id } = useParams();

  // const bill = stateWrapper.bill;
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState<File | null | undefined>(undefined);
  const navigate = useNavigate();
  const auth = getAuth();

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
    uploadBytes(storageRef, image!, {}).then((snapshot) => {
      uploadProof(fileName);
    });
  };

  const completeBill = async () => {
    if (paid) {
      return;
    }

    await markPayBill({
      pathParams: {
        id: bill.id,
      },
      body: {
        paid: true,
        proof: undefined,
      },
    });

    billMutate();
  };

  const uploadProof = (proof: string) => {
    markPayBill({
      pathParams: {
        id: bill.id,
      },
      body: {
        paid: true,
        proof: proof,
      },
    });
  };

  const parseFileName = (fileName: String) => {
    if (fileName.length < 22) {
      return fileName;
    }
    return fileName.slice(0, 10) + '...' + fileName.slice(-10);
  };

  const deleteBill = async () => {
    deleteBillCall({ pathParams: { id: bill.id } });
    navigate('/bills', { replace: true });
  };

  return (
    <Page>
      {isEdit ? (
        <div className="pt-10 px-10 md:px-20">
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
        <div className="pt-10 px-10 md:px-20">
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
                    {paid ? 'paid' : 'Complete'}
                  </Button>
                  {isOwner ? (
                    <Button
                      auto
                      className="mx-5"
                      onClick={() => setIsEdit(!isEdit)}
                      icon={<PencilIcon className="h-5 w-5 text-teal-50" />}
                    />
                  ) : (
                    <></>
                  )}
                  {isOwner ? (
                    <Button
                      auto
                      onClick={() => deleteBill()}
                      icon={<TrashIcon className="h-5 w-5 text-teal-50" />}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="rounded-b-xl px-4 lg:px-8 py-4 flex flex-col items-center gap-y-1 bg-gray-800 h-full">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:w-full">
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
                    <div className="font-bold text-3xl text-teal-500">
                      Payment
                    </div>
                    <div className="flex flex-col">
                      {bill.users.map((u) => (
                        <UserRow key={u.id} u={u} userId={userId} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row self-end items-center justify-end">
                  <label
                    htmlFor="file-upload"
                    className="text-white flex bold justify-center items-center transition-all bg-teal-500 hover:bg-teal-400 rounded-full px-4 py-2 font-medium h-fit"
                  >
                    <input
                      id="file-upload"
                      hidden
                      type={'file'}
                      onChange={(e) => {
                        setImage(e.currentTarget.files?.item(0));
                      }}
                    ></input>
                    <span className="text-right max-w-xs text-clip overflow-hidden">
                      {image ? parseFileName(image.name) : 'Select File'}
                    </span>
                  </label>
                  <Spacer x={1} />
                  <button
                    className={
                      'text-white flex justify-center items-center transition-all bg-teal-500 hover:bg-teal-400 rounded-full px-4 py-2 font-medium h-fit'
                    }
                    onClick={() => onUpload()}
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
      <div className="font-bold text-base md:text-3xl text-teal-500">
        {title}
      </div>
      <div className="font-bold text-base md:text-xl py-2 text-white">
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
    console.log('house.users');

    console.log(house.users);
    return house.users?.find((u) => u.firebaseId === uid)?.name;
  };

  return (
    <div key={u.id} className="flex flex-col w-full items-start py-2">
      <div className="font-bold text-base md:text-xl text-white">
        {getUserFromId(u.id)}
      </div>
      <div className="flex flex-row w-full justify-between items-start">
        <div className="font-bold text-base md:text-2xl text-white">
          {u.paid ? <>Paid</> : <>${u.amount}</>}
        </div>
        {userId === u.id ? <></> : <div className=""></div>}
      </div>
    </div>
  );
};

export default BillDetailPage;
