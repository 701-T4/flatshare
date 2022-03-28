import { Container, Row, Button } from '@nextui-org/react';
import React, { useContext, useState } from 'react';
import { OccupantCardProps } from './OccupantCard';
import InputField from './OccupantInputField';

import { PanelContext } from './OccupantPanel';

interface InputContextInterface {
  occupantFormData: OccupantCardProps;
  setOccupantFormData: React.Dispatch<React.SetStateAction<OccupantCardProps>>;
}

export const InputContext = React.createContext<InputContextInterface>(
  {} as InputContextInterface,
);

const OccupantForm: React.FC<OccupantCardProps> = (props) => {
  const [occupantFormData, setOccupantFormData] = useState<OccupantCardProps>({
    ...props,
  });
  const { ownerView, onSaveOccupant, onDeleteOccupant } =
    useContext(PanelContext);
  return (
    <InputContext.Provider value={{ occupantFormData, setOccupantFormData }}>
      <Container xl style={{ padding: 0 }}>
        <Row>
          <InputField
            field={'percentageOfRent'}
            text={'Percentage of rent to pay'}
            displayPercentage
          />
          <InputField field={'contact'} text={'Contact number'} />
        </Row>
        <Row className="mt-4">
          <InputField field={'dateJoined'} text={'Date joined'} />
          <InputField field={'contractEndDate'} text={'Contract ending date'} />
        </Row>
        <div className="flex justify-end mt-12 mr-5 ">
          {ownerView && (
            <>
              <Button
                onClick={() => onDeleteOccupant(occupantFormData.firebaseId)}
                className="inline-block bg-btn_red"
              >
                Remove Occupant
              </Button>
              <Button
                onClick={() => onSaveOccupant(occupantFormData)}
                className="inline-block ml-4 bg-btn_green"
              >
                Save
              </Button>
            </>
          )}
        </div>
      </Container>
    </InputContext.Provider>
  );
};

export default OccupantForm;
