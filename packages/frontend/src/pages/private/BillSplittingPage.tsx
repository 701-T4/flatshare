import React, { useState } from 'react';
import Page from '../../components/common/layout/Page';
import UpcomingTask from '../../components/dashboard/upcoming-tasks/UpcomingTask';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router';
import NewBillCard from '../../components/bill/NewBillCard';

interface BillSplittingPageProps {}

const BillSplittingPage: React.FC<BillSplittingPageProps> = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const adhocUpcomingBillIds = [
    {
      name: 'Countdown',
      description: 'I go for buy some eat',
      owner: 'firebaseID',
      due: 1647215067300,
      users: [
        {
          id: 'cZWbFn471ihGFtlMBVKo3DrH1D43',
          amount: 30, //$
          paid: false,
          proof: 'blob id', //optional
        },
        {
          id: 'firebaseId',
          amount: 20, //$
          paid: false,
          proof: 'blob id', //optional
        },
      ],
    },
  ];
  const [adhocPastBillIds, setAdhocPastBillIds] = useState([2, 4]);

  return (
    <Page>
      <div className="flex flex-col gap-4">
        <NewBillCard />
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
          className="w-16 mt-3 bg-gray-500"
          onClick={() => setAdhocPastBillIds([...adhocPastBillIds, 0, 0, 0, 0])}
        >
          Load More
        </Button>
      </div>
    </Page>
  );
};

export default BillSplittingPage;
