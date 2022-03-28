import { Text } from '@nextui-org/react';
import React from 'react';
import OccupantCard from './OccupantCard';

interface OccupantPanelProps {
  cards: OccupantCardProps[];
  config: OccupantPanelConfig;
}

export interface OccupantCardProps {
  name: string;
  _id: string;
  contact: string;
  percentageOfRent: number;
  dateJoined: string;
  contractEndDate: string;
}

interface OccupantPanelConfig {
  ownerView: boolean;
  totalRent: number;
}

export const PanelContext = React.createContext<OccupantPanelConfig>(
  {} as OccupantPanelConfig,
);

const OccupantPanel: React.FC<OccupantPanelProps> = (props) => {
  return (
    <PanelContext.Provider value={props.config}>
      <Text
        size={24}
        weight={'bold'}
        color={'primary'}
        className="ml-5 inline-block"
      >
        Occupants
        <div className="bg-black h-0.5 w-full" />
      </Text>
      {props.cards.map((card) => (
        <OccupantCard {...card} />
      ))}
    </PanelContext.Provider>
  );
};

export default OccupantPanel;
