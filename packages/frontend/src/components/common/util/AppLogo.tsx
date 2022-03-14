import React from 'react';
import { ReactComponent as Logo } from '../../../res/logo-text/SVG/logo-text.svg';

interface AppLogoProps {}

const AppLogo: React.FC<AppLogoProps> = () => {
  return <Logo className="w-48" />;
};

export default AppLogo;
