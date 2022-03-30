import React, { useCallback, useMemo, useState } from 'react';
import Page from '../../components/common/layout/Page';
import UpcomingTask from '../../components/dashboard/upcoming-tasks/UpcomingTask';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';
// import { useAuth } from '../../hooks/useAuth';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router';
// import { useApiMutation } from '../../hooks/useApi';
import { useApi } from '../../hooks/useApi';
import NewIssueCard from '../../components/issue/NewIssueCard';

interface IssuesPageProps {}

/* 

  CREATE ISSUE:
  {      
    name: string;
    description: string;
    house: string; // @TODO CHECK
    logger: string;
    resolved: boolean;
  }

 Issue response:
  {      
    id: string;
    name: string;
    description: string;
    logger: string;
    loggedDate: number;
    resolved: boolean;
  }

*/

const IssuesPage: React.FC<IssuesPageProps> = () => {
  // const { user } = useAuth();
  const navigate = useNavigate();

  /* TODO: UPDATE THIS SECTION WHEN API IS READY */

  const { data, mutate } = useApi('/api/v1/house/issues', {
    method: 'get',
  });
  // TODO: ask backend to make an issues/{id}/resolved endpoint?
  // const markResolvedIssue = useApiMutation('/api/v1/house/issues/{id}/resolved', {
  //   method: 'put',
  // });

  const optimisticallyRefetchIssues = useCallback(
    (newIssue) => {
      const newData = { ...data! };
      newIssue.loading = true;
      newData.issues.push(newIssue);
      mutate(newData);
    },
    [data, mutate],
  );

  /* ---------------------------------------------- */

  const [newIssue, setNewIssue] = useState(false);

  const pastIssue: {
    id: string;
    name: string;
    description: string;
    logger: string;
    loggedDate: number;
    resolved: boolean;
  }[] = [];

  const sortedIssues = useMemo(
    () => data?.issues.sort((a, b) => a.loggedDate - b.loggedDate),
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
            refetchOptimisticIssues={optimisticallyRefetchIssues}
            refetchFromApi={mutate}
          />
        )}

        <div className="flex flex-col gap-4">
          <UnderlinedText colorClasses="bg-gray-800">
            <div className="text-lg font-semibold">Upcoming Issues</div>
          </UnderlinedText>
          {sortedIssues?.map((issue, index) => {
            // Check if this issue is a past issue by checking whether it has been marked as resolved
            if (issue.resolved) {
              pastIssue.push(issue);
              return null;
            }

            return (
              <UpcomingTask
                key={index}
                title={issue.name}
                dueString={issue.loggedDate + ''} // @TODO: convert to date
                completed={issue.resolved}
                twColor={UpcomingTask.Variation.red} // @TODO: decide on colour
                disabled={(issue as any).loading}
                type="Bill" // @TODO: change how this behaves
                onDetailClick={() =>
                  navigate(`/issues/${issue.id}`, { state: { issue: issue } })
                }
                onCompleteClick={async () => {
                  // @TODO: send an update to mark this as resolved, do optimistic update stuff.
                }}
              />
            );
          })}
          {data?.issues.length === pastIssue.length && (
            <div className="flex flex-col items-center py-5 text-xl font-semibold text-gray-300">
              No Current Issues
            </div>
          )}

          <UnderlinedText className="pt-10" colorClasses="bg-gray-800">
            <div className="text-lg font-semibold">Past Issues</div>
          </UnderlinedText>
          {pastIssue.length !== 0 ? (
            <>
              <div className="flex flex-col gap-4 mt-4 md:grid md:grid-cols-2">
                {pastIssue.map((issue, index) => (
                  <UpcomingTask
                    key={index}
                    title={issue.name}
                    dueString="Done" // @TODO: check that "dueString" is how we want it formatted
                    twColor={UpcomingTask.Variation.gray}
                    type="Issue"
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
              No Resolved Issues
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default IssuesPage;
