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
    props.percentageOfRent || 0,
  );
  const [contact, setContact] = useState<string>(props.contact || '');
  const [joinDate, setJoinDate] = useState<Date>(props.dateJoined as Date);
  const [endDate, setEndDate] = useState<Date>(props.contractEndDate as Date);

  const { ownerView, onSaveOccupant, onDeleteOccupant } =
    useContext(PanelContext);
  return (
    <Container xl style={{ padding: 0 }}>
      <Row>
        <Col>
          <Text className="mb-1" color={'secondary'} size={15}>
            {'Percentage of rent to pay'}
          </Text>
          <Input
            readOnly={!ownerView}
            initialValue={props.percentageOfRent?.toString()}
            aria-label={'Percentage of rent to pay'}
            onChange={(e) => setPercentage(Number(e.target.value))}
            color="secondary"
            labelRight={'%'}
            width="60%"
          />
        </Col>
        <Col>
          <Text className="mb-1" color={'secondary'} size={15}>
            {'Contact number'}
          </Text>
          <Input
            readOnly={!ownerView}
            initialValue={props.contact}
            onChange={(e) => setContact(e.target.value)}
            aria-label={'Contact number'}
            color="secondary"
            width="60%"
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Text className="mb-1" color={'secondary'} size={15}>
            {'Date joined'}
          </Text>
          <ReactDatePicker
            className="appearance-none rounded-xl h-10 p-1 pl-2 text-sm text-black w-3/5"
            selected={joinDate}
            dateFormat="MMMM d, yyyy"
            onChange={(date: Date) => setJoinDate(date)}
            popperProps={{ strategy: 'fixed' }}
            popperPlacement={'auto'}
          />
        </Col>
        <Col>
          <Text className="mb-1" color={'secondary'} size={15}>
            {'Contract ending date'}
          </Text>
          <ReactDatePicker
            className="appearance-none rounded-xl h-10 p-1 pl-2 text-sm text-black w-3/5"
            selected={endDate}
            dateFormat="MMMM d, yyyy"
            onChange={(date: Date) => setEndDate(date)}
            popperProps={{ strategy: 'fixed' }}
            popperPlacement={'auto'}
          />
        </Col>
      </Row>
      <div className="flex justify-end mt-12 mr-5 ">
        {ownerView && (
          <>
            <Button
              onClick={() => onDeleteOccupant(props.firebaseId)}
              className="inline-block bg-btn_red"
            >
              Remove Occupant
            </Button>
            <Button
              onClick={() => {
                const newOccupantData: OccupantCardProps = { ...props };
                newOccupantData.contact = contact;
                newOccupantData.contractEndDate = endDate;
                newOccupantData.dateJoined = joinDate;
                newOccupantData.percentageOfRent = percentage;
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
