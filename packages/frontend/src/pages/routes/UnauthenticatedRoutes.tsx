import React from "react";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "../public/HomePage";
import SignInPage from "../public/SignInPage";

interface UnauthenticatedRoutesProps {}

const UnauthenticatedRoutes: React.FC<UnauthenticatedRoutesProps> = () => {
  return (
    <Routes>
      <Route path="auth" element={<SignInPage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default UnauthenticatedRoutes;
