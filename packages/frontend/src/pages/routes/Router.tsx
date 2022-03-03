import React, { useState } from "react";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnauthenticatedRoutes from "./UnauthenticatedRoutes";

interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
  const [authLoaded] = useState(true);
  const [signedIn] = useState(false);

  if (!authLoaded) {
    return null;
  }

  if (!signedIn) {
    return <UnauthenticatedRoutes />;
  }

  return <AuthenticatedRoutes />;
};

export default Router;
