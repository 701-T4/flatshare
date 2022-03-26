import React, { useCallback, useMemo, useState } from 'react';
import Page from '../../components/common/layout/Page';
import UpcomingTask from '../../components/dashboard/upcoming-tasks/UpcomingTask';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router';
import { useApiMutation } from '../../hooks/useApi';
import { useApi } from '../../hooks/useApi';
import NewIssueCard from '../../components/issue/NewIssueCard';

interface IssuesPageProps {}

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const IssuesPage: React.FC<IssuesPageProps> = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  /* TODO: UPDATE THIS SECTION WHEN API IS READY */

  const { data, mutate } = useApi('/api/v1/house/bills', {
    method: 'get',
  });

  const markPayBill = useApiMutation('/api/v1/house/bills/{id}/payment', {
    method: 'put',
  });

  const optimisticallyRefetchBills = useCallback(
    (newIssue) => {
      const newData = { ...data! };
      newIssue.loading = true;
      newData.bills.push(newIssue);
      mutate(newData);
    },
    [data, mutate],
  );

  /* ---------------------------------------------- */

  const [newIssue, setNewIssue] = useState(false);

  const pastBill: {
    id: string;
    name: string;
    description: string;
    owner: string;
    due: number;
    users: {
      id: string;
      amount: number;
      paid: boolean;
      proof?: string | undefined;
    }[];
  }[] = [];
  const sortedBills = useMemo(
    () => data?.bills.sort((a, b) => a.due - b.due),
    [data],
  );

  return (
    <Page>
      <div className="flex flex-col gap-4">
        <Button
          aria-label="New Issue"
          className="w-16 my-3 bg-teal-500"
          onClick={() => setNewIssue(!newIssue)}
        >
          New Issue
        </Button>
        {newIssue && (
          <NewIssueCard
            refetchOptimisticBills={optimisticallyRefetchBills}
            refetchFromApi={mutate}
          />
        )}
        <div className="flex flex-col gap-4">
          <UnderlinedText colorClasses="bg-gray-800">
            <div className="text-lg font-semibold">Upcoming Bills</div>
          </UnderlinedText>
          {sortedBills?.map((bill, index) => {
            // Check if this bill is a past bill by check whether all user is paid
            if (
              bill.users.every((user) => {
                if (user.paid) return true;
                else return false;
              })
            ) {
              pastBill.push(bill);
              return null;
            }

            var amount, paid: boolean | undefined;
            for (let index in bill.users)
              if (bill.users[index].id.toString() === user?.uid) {
                amount = bill.users[index].amount;
                paid = bill.users[index].paid;
              }

            const dueDate = new Date(bill.due);
            const overDue = bill.due < Date.now();

            return (
              <UpcomingTask
                key={index}
                title={`${bill.name} - $${amount}`}
                // Format the date, display as for exmaple: Due Monday, 14 March
                dueString={`Due ${
                  days[dueDate.getDay()]
                }, ${dueDate.getDate()} ${month[dueDate.getMonth()]} ${
                  overDue ? 'OVERDUE!!!' : ''
                }`}
                completed={paid}
                overdue={overDue}
                twColor={UpcomingTask.Variation.red}
                disabled={(bill as any).loading}
                type="Bill"
                onDetailClick={() =>
                  navigate(`/issues/${bill.id}`, { state: { bill: bill } })
                }
                onCompleteClick={async () => {
                  const optimisticBills = { ...data! };
                  const currentBill = optimisticBills.bills![index].users.find(
                    (u) => u.id === user!.uid,
                  )!;
                  currentBill.paid = !currentBill.paid;

                  mutate(optimisticBills);

                  await markPayBill({
                    pathParams: {
                      id: bill.id,
                    },
                    body: {
                      paid: !paid,
                      proof: undefined,
                    },
                  });
                }}
              />
            );
          })}
          {/* If every bill is past bill, display no upcoming bill message */}
          {data?.bills.length === pastBill.length && (
            <div className="flex flex-col items-center py-5 text-xl font-semibold text-gray-300">
              No Upcoming Bill
            </div>
          )}
          <UnderlinedText className="pt-10" colorClasses="bg-gray-800">
            <div className="text-lg font-semibold">Past Bills</div>
          </UnderlinedText>
          {pastBill.length !== 0 ? (
            <>
              <div className="flex flex-col gap-4 mt-4 md:grid md:grid-cols-2">
                {pastBill.map((bill, index) => (
                  <UpcomingTask
                    key={index}
                    title={bill.name}
                    dueString="Done"
                    twColor={UpcomingTask.Variation.gray}
                    type="Bill"
                    completed
                    past
                  />
                ))}
              </div>

              <Button
                aria-label="Load more past bill"
                className="w-16 mt-3 bg-gray-500"
              >
                Load More
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center py-5 text-xl font-semibold text-gray-300">
              No Past Bill
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default IssuesPage;
