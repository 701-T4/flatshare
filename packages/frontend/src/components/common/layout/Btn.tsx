import { Button, extraColors } from '@nextui-org/react';
import React from 'react';

export interface BtnProps {
  content: string;
  bordered: boolean;
  width?: any;
  padding?: string;
}

const Btn: React.FC<BtnProps> = (props: BtnProps) => {
  const btnStyle = props.width && {
    width: props.width,
    padding: props.padding,
  };

  return (
    <Button bordered={props.bordered} color="secondary" style={btnStyle}>
      {props.content}
    </Button>
  );
};

export default Btn;
