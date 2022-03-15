import React, { useState } from 'react';

interface PasswordModalProps {
  visible: boolean;
  setVisible(value: boolean): void;
  loading: boolean;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  visible,
  setVisible,
  loading,
}) => {

  const closeHandler = () => {
    setVisible(false);
  };
        
  return (
    <div></div>
  );
};

export default PasswordModal;