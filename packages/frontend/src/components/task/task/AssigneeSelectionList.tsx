import { Checkbox, Collapse } from '@nextui-org/react';
import React from 'react';

interface AssigneeSelectionListProps {
  peopleInHouse: { name: string }[];
  checkBoxValues: string[];
  setCheckBoxValues(value: string[]): void;
}

const AssigneeSelectionList: React.FC<AssigneeSelectionListProps> = ({
  peopleInHouse,
  checkBoxValues,
  setCheckBoxValues,
}) => {
  return (
    <Collapse title="Select Assignees">
      <Checkbox.Group
        color="success"
        value={checkBoxValues}
        onChange={(event) => {
          console.log(event);
          setCheckBoxValues(event);
        }}
      >
        {peopleInHouse.map((person) => {
          return <Checkbox value={person.name}>{person.name}</Checkbox>;
        })}
      </Checkbox.Group>
    </Collapse>
  );
};

export default AssigneeSelectionList;
