import React from 'react';
import Page from '../../components/common/layout/Page';
import { Button, Text, Grid, Card } from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/outline';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';

interface NotesProps {}

const NotesPage: React.FC<NotesProps> = () => {
  return (
    <Page>
      <div className="flex justify-between items-center pb-1">
        <UnderlinedText colorClasses="from-gray-800 via-teal-700 to-teal-500 ">
          <div className="text-lg font-large">{'Notes'}</div>
        </UnderlinedText>
        <Button icon={<PlusIcon />}>Create Note</Button>
      </div>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12}>
          <Card color="primary">
            <Text h4 color="white" size={30}>
              Note Name
            </Text>
            <Text color="white" size={16}>
              {' '}
              Note Type
            </Text>
          </Card>
        </Grid>
      </Grid.Container>
    </Page>
  );
};

export default NotesPage;
