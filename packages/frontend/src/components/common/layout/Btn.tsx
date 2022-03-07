import { Button, extraColors } from '@nextui-org/react';
import React from 'react';

export interface BtnProps {
  content: string;
  bordered: boolean;
}

const Btn: React.FC<BtnProps> = (props: BtnProps) => {
  const btnStyle = {
    width: '100%',
    //background: "transparent",
  };

  return (
    <Button bordered={props.bordered} color="secondary" style={btnStyle}>
      {props.content}
    </Button>
  );
};

export default Btn;
