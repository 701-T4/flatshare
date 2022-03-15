import React, { useState } from 'react';

interface SecretModalProps {
  visible: boolean;
  setVisible(value: boolean): void;
  loading: boolean;
}

const SecretModal: React.FC<SecretModalProps> = ({
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

export default SecretModal;