import React from 'react';
import { Button, Text, Grid, Card } from '@nextui-org/react';

interface NotesGridProps {
  name?: string;
  type?: string;
}

const NotesGrid: React.FC<NotesGridProps> = ({ name, type }) => {
  return (
    <div>
      <Card>
        <Text>{name}</Text>
        <Text>{type}</Text>
      </Card>
    </div>
  );
};

export default NotesGrid;
