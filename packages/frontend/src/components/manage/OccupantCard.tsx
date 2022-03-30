import { Collapse, Text } from '@nextui-org/react';
import React, { useContext } from 'react';
import OccupantForm from './OccupantForm';
import { PanelContext } from './OccupantPanel';

export interface OccupantCardProps {
  name: string;
  firebaseId: string;
  contact?: string;
  rentPercentage?: number;
  dateJoined?: Date;
  contractEndingDate?: Date;
}

const OccupantCard: React.FC<OccupantCardProps> = (props) => {
  const { totalRent } = useContext(PanelContext);

  const OccupantSummary: React.FC = () => {
    const rentToPay = (totalRent * (props.rentPercentage || 0) * 0.01).toFixed(
      2,
    );
    return (
      <>
        <Text color={'secondary'} size={20}>
          <strong>{props.name}</strong>
        </Text>
        <Text color={'secondary'} margin={0}>
          Total rent: ${rentToPay}
        </Text>
      </>
    );
  };

  return (
    <>
      <Collapse.Group splitted>
        <Collapse
          // background color cannot be overridden with css prop nor tailwind className
          style={{ backgroundColor: '#1D2530' }}
          title={<OccupantSummary />}
          css={{ size: '$tiny' }}
        >
          <OccupantForm {...props} />
        </Collapse>
      </Collapse.Group>
    </>
  );
};

export default OccupantCard;
