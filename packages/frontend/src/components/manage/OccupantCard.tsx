import { Collapse, Text } from '@nextui-org/react';
import React, { useContext } from 'react';
import OccupantForm from './OccupantForm';
import { PanelContext } from './OccupantPanel';

/**
 * This is equivalent to the data schema of User collection in the database.
 * (plus some extra fields)
 */
export interface OccupantCardProps {
  name: string;
  firebaseId: string;
  contact?: string;
  rentPercentage?: number;
  dateJoined?: Date;
  contractEndingDate?: Date;
  isOwner: boolean;
}

/**
 * A collapsible card that exposes the settings for each occupant.
 * The only responsibility of this component is to make a collapsible component that wraps around OccupantForm
 * @param props
 * @returns
 */
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
      <Collapse.Group splitted style={{ padding: 0 }}>
        <Collapse
          // background color for NextUI's Collapse component
          // cannot be overridden with css prop nor tailwind className
          style={{ backgroundColor: '#1D2530' }}
          title={<OccupantSummary />}
        >
          <OccupantForm {...props} />
        </Collapse>
      </Collapse.Group>
    </>
  );
};

export default OccupantCard;
