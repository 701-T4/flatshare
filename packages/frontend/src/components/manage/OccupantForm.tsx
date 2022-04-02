import { Container, Row, Button, Col, Text, Input } from '@nextui-org/react';
import React, { useContext, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { OccupantCardProps } from './OccupantCard';

import { PanelContext } from './OccupantPanel';

interface InputContextInterface {
  occupantFormData: OccupantCardProps;
  setOccupantFormData: React.Dispatch<React.SetStateAction<OccupantCardProps>>;
}

export const InputContext = React.createContext<InputContextInterface>(
  {} as InputContextInterface,
);

const OccupantForm: React.FC<OccupantCardProps> = (props) => {
  const [percentage, setPercentage] = useState<number>(
    props.rentPercentage || 0,
  );
  const [contact, setContact] = useState<string>(props.contact || '');
  const [joinDate, setJoinDate] = useState<Date>(props.dateJoined as Date);
  const [endDate, setEndDate] = useState<Date>(
    props.contractEndingDate as Date,
  );

  const { ownerView, onSaveOccupant, onDeleteOccupant } =
    useContext(PanelContext);
  return (
    <Container xl className="p-0">
      <div className="flex flex-col gap-y-3 sm:gap-y-10 sm:pt-5 sm:flex-row sm:flex-wrap sm:gap-x-28">
        <div className="w-full sm:w-2/6">
          <Text className="mb-1" color={'secondary'} size={15}>
            {'Percentage of rent to pay'}
          </Text>
          <Input
            readOnly={!ownerView}
            initialValue={props.rentPercentage?.toString()}
            aria-label={'Percentage of rent to pay'}
            onChange={(e) => setPercentage(Number(e.target.value))}
            color="secondary"
            labelRight={'%'}
            width="100%"
          />
        </div>
        <div className="w-full sm:w-2/6">
          <Text className="mb-1" color={'secondary'} size={15}>
            {'Contact number'}
          </Text>
          <Input
            readOnly={!ownerView}
            initialValue={props.contact}
            onChange={(e) => setContact(e.target.value)}
            aria-label={'Contact number'}
            color="secondary"
            width="100%"
          />
        </div>
        <div className="w-full sm:w-2/6">
          <Text className="mb-1" color={'secondary'} size={15}>
            {'Date joined'}
          </Text>
          <ReactDatePicker
            className="w-full h-10 p-1 pl-2 text-sm text-black appearance-none rounded-xl"
            selected={joinDate}
            dateFormat="MMMM d, yyyy"
            onChange={(date: Date) => setJoinDate(date)}
            popperProps={{ strategy: 'fixed' }}
            popperPlacement={'auto'}
          />
        </div>
        <div className="w-full sm:w-2/6">
          <Text className="mb-1" color={'secondary'} size={15}>
            {'Contract ending date'}
          </Text>
          <ReactDatePicker
            className="w-full h-10 p-1 pl-2 text-sm text-black appearance-none rounded-xl"
            selected={endDate}
            dateFormat="MMMM d, yyyy"
            onChange={(date: Date) => setEndDate(date)}
            popperProps={{ strategy: 'fixed' }}
            popperPlacement={'auto'}
          />
        </div>
      </div>
      <div className="flex justify-end w-full mt-6 mr-5 sm:w-auto sm:mt-12 ">
        {ownerView && (
          <>
            {!props.isOwner && (
              <Button
                onClick={() => onDeleteOccupant(props.firebaseId)}
                className="inline-block bg-btn_red"
              >
                Remove Occupant
              </Button>
            )}
            <Button
              onClick={() => {
                const newOccupantData: OccupantCardProps = { ...props };
                newOccupantData.contact = contact;
                newOccupantData.contractEndingDate = endDate;
                newOccupantData.dateJoined = joinDate;
                newOccupantData.rentPercentage = percentage;
                onSaveOccupant(newOccupantData);
              }}
              className="inline-block ml-4 bg-btn_green"
            >
              Save
            </Button>
          </>
        )}
      </div>
    </Container>
  );
};

export default OccupantForm;
