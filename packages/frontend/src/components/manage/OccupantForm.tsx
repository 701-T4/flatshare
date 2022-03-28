import {
  Container,
  Row,
  Input,
  Col,
  Button,
  FormElement,
} from '@nextui-org/react';
import React, { useContext, useState } from 'react';

import { OccupantCardProps, PanelContext } from './OccupantPanel';

interface InputFieldProps {
  field: string;
  text: string;
  displayPercentage?: boolean;
}

interface InputContextInterface {
  occupantFormData: OccupantCardProps;
  setOccupantFormData: React.Dispatch<React.SetStateAction<OccupantCardProps>>;
}

const InputContext = React.createContext<InputContextInterface>(
  {} as InputContextInterface,
);

const InputField: React.FC<InputFieldProps> = (props) => {
  const state = useContext(InputContext);
  const { ownerView } = useContext(PanelContext);
  const onInputChange = (e: React.ChangeEvent<FormElement>) => {
    state.setOccupantFormData({
      ...state.occupantFormData,
      [props.field]: e.target.value,
    });
  };
  return (
    <Col>
      <Input
        readOnly={!ownerView}
        initialValue={
          state.occupantFormData[
            props.field as keyof OccupantCardProps
          ] as string
        }
        onChange={onInputChange}
        label={props.text}
        color="secondary"
        labelRight={props.displayPercentage ? '%' : undefined}
        width="60%"
      />
    </Col>
  );
};

const OccupantForm: React.FC<OccupantCardProps> = (props) => {
  const [occupantFormData, setOccupantFormData] = useState<OccupantCardProps>({
    ...props,
  });
  const { ownerView } = useContext(PanelContext);
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
              <Button className="inline-block bg-btn_red">
                Remove Occupant
              </Button>
              <Button
                onClick={() => {
                  console.log('TODO: send to backend', occupantFormData);
                }}
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
