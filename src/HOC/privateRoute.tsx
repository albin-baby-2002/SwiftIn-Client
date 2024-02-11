import React, { useEffect } from "react";
import useAuth from "../Hooks/zustandStore/useAuth";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  Element: React.FC;
  allowedRoles: number[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  Element,
  allowedRoles,
}) => {
  const auth = useAuth();

  const roles = auth.roles;

  return roles.find((role) => allowedRoles.includes(role)) ? (
    <Element />
  ) : (
    <Navigate to=".." />
  );
};

export default PrivateRoute;
