import React, { useState, useEffect } from 'react';
import Page from '../../components/common/layout/Page';
import UpcomingTask from '../../components/dashboard/upcoming-tasks/UpcomingTask';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router';
import NewBillCard from '../../components/bill/NewBillCard';
import { Collapse } from '@nextui-org/react';
import { useApi, useApiMutation } from '../../hooks/useApi';

interface BillSplittingPageProps {}

const BillSplittingPage: React.FC<BillSplittingPageProps> = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // const bills = useApiMutation('/api/v1/house/bills', {
  //   method: 'post',
  // });

  // useEffect(() => {
  //   const response = bills({
  //     body: {
  //       name: 'Countdown Shopping',
  //       description: 'I go for buy some eat',
  //       due: 1647219067300,
  //       users: [
  //         {
  //           id: 'cZWbFn471ihGFtlMBVKo3DrH1D43',
  //           amount: 30, //$
  //           paid: false,
  //           proof: 'blob id', //optional
  //         },
  //         {
  //           id: 'lkBvILhKiRUwe2JAdBQPZQZeTTp1',
  //           amount: 20, //$
  //           paid: false,
  //           proof: 'blob id', //optional
  //         },
  //       ],
  //     },
  //   });

  //   response.then(console.log);
  // }, []);

  const bills = useApi('/api/v1/house/bills', {
    method: 'get',
  });
  console.log(bills);

  const adhocUpcomingBillIds = [
    {
      name: 'Countdown',
      description: 'I go for buy some eat',
      owner: 'cZWbFn471ihGFtlMBVKo3DrH1D43',
      due: 1647215067300,
      users: [
        {
          id: 'cZWbFn471ihGFtlMBVKo3DrH1D43',
          amount: 30, //$
          paid: false,
          proof: 'blob id', //optional
        },
        {
          id: 'lkBvILhKiRUwe2JAdBQPZQZeTTp1',
          amount: 20, //$
          paid: false,
          proof: 'blob id', //optional
        },
      ],
    },
  ];
  const [adhocPastBillIds, setAdhocPastBillIds] = useState([2, 4]);
  const [newBill, setNewBill] = useState(false);

  return (
    <Page>
      <div className="flex flex-col gap-4">
        <Collapse
          arrowIcon=" "
          disabled
          className="border-0"
          expanded={newBill}
          title={
            <Button
              aria-label="New bill"
              className="w-16 my-3 bg-teal-500"
              onClick={() => setNewBill(!newBill)}
            >
              New Bill
            </Button>
          }
        >
          <NewBillCard />
        </Collapse>
        <div className="flex flex-col gap-4">
          <UnderlinedText colorClasses="bg-gray-800">
            <div className="text-lg font-semibold">Upcoming Bills</div>
          </UnderlinedText>
          {adhocUpcomingBillIds.map((bill, index) => {
            var amount;
            for (let index in bill.users)
              if (bill.users[index].id === user?.uid)
                amount = bill.users[index].amount;

            return (
              <UpcomingTask
                title={`${bill.name} - $${amount}`}
                dueString={bill.due.toString()}
                twColor={UpcomingTask.Variation.red}
                type="Bill"
                onCompleteClick={() => navigate('/bills/1')}
              />
            );
          })}
          <UnderlinedText className="pt-10" colorClasses="bg-gray-800">
            <div className="text-lg font-semibold">Past Bills</div>
          </UnderlinedText>
          <div className="flex flex-col gap-4 mt-4 md:grid md:grid-cols-2">
            {adhocPastBillIds.map((bill, index) => (
              <UpcomingTask
                title="Take out the Rubbish"
                dueString="Done"
                twColor={UpcomingTask.Variation.gray}
                type="Bill"
                completed
              />
            ))}
          </div>

          <Button
            aria-label="Name"
            className="w-16 mt-3 bg-gray-500"
            onClick={() =>
              setAdhocPastBillIds([...adhocPastBillIds, 0, 0, 0, 0])
            }
          >
            Load More
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default BillSplittingPage;
