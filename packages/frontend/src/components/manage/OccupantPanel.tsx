import React from 'react';
import OccupantCard, { OccupantCardProps } from './OccupantCard';

interface OccupantPanelProps {
  cards: OccupantCardProps[]; // list of user details to be displayed in the list of OccuapntCard. Refer to OccupantCardProps.
  ownerView: boolean; // Whether the person viewing Manage Flat page is the owner of the flat. This impacts editability of form fields.
  totalRent: number; // Total rent to be split between occupants.
  onSaveOccupant: (occupantDetails: OccupantCardProps) => void; // api hook for saving occupant
  onDeleteOccupant: (firebaseId: string) => void; // api hook for deleting occupant
}

/**
 * Configurations to be passed down to children components of OccupantPanel component.
 */
interface OccupantPanelConfig {
  ownerView: boolean;
  totalRent: number;
  onSaveOccupant: (occupantDetails: OccupantCardProps) => void;
  onDeleteOccupant: (firebaseId: string) => void;
}

export const PanelContext = React.createContext<OccupantPanelConfig>(
  {} as OccupantPanelConfig,
);

/**
 * Panel is the top level component for occupants settings section of the Manage Flat page.
 * It passes configurations (refer to OccupantPanelConfig interface) down through context.
 * It aggregates a list of OccupantCard, each of which contains an OccupantForm.
 *
 * @param props
 * @returns
 */
const OccupantPanel: React.FC<OccupantPanelProps> = (props) => {
  const { cards, ownerView, totalRent, onSaveOccupant, onDeleteOccupant } =
    props;
  return (
    <PanelContext.Provider
      value={{ ownerView, totalRent, onSaveOccupant, onDeleteOccupant }}
    >
      {cards.map((card) => (
        <OccupantCard {...card} key={card.firebaseId} />
      ))}
    </PanelContext.Provider>
  );
};

export default OccupantPanel;
