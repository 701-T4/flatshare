import { Input, Col, FormElement, Text } from '@nextui-org/react';
import React, { useContext } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { OccupantCardProps } from './OccupantCard';
import { InputContext } from './OccupantForm';
import { PanelContext } from './OccupantPanel';

interface InputFieldProps {
  field: keyof OccupantCardProps;
  text: string;
  displayPercentage?: boolean;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const state = useContext(InputContext);
  const { ownerView } = useContext(PanelContext);

  const isInputFieldForDate =
    props.field === 'dateJoined' || props.field === 'contractEndDate';
  const initialValue = state.occupantFormData[props.field] || null;

  const onInputChange = (e: React.ChangeEvent<FormElement>) =>
    state.setOccupantFormData({
      ...state.occupantFormData,
      [props.field]: e.target.value,
    });
  const onDateChange = (date: Date) =>
    state.setOccupantFormData({
      ...state.occupantFormData,
      [props.field]: date,
    });

  const TextFieldInput = () => {
    return (
      <Input
        readOnly={!ownerView}
        initialValue={initialValue as string}
        aria-label={props.text}
        onChange={onInputChange}
        color="secondary"
        labelRight={props.displayPercentage ? '%' : undefined}
        width="60%"
      />
    );
  };

  const DatePickerInput = () => {
    return (
      <ReactDatePicker
        className="appearance-none rounded-xl h-10 p-1 pl-2 text-sm text-black w-3/5"
        selected={initialValue instanceof Date ? initialValue : null}
        dateFormat="MMMM d, yyyy"
        onChange={onDateChange}
        popperProps={{ strategy: 'fixed' }}
        popperPlacement={'auto'}
      />
    );
  };

  return (
    <Col>
      <Text className="mb-1" color={'secondary'} size={15}>
        {props.text}
      </Text>
      {isInputFieldForDate ? <DatePickerInput /> : <TextFieldInput />}
    </Col>
  );
};

export default InputField;
