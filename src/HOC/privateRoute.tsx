import React from "react";
import useAuth from "../Hooks/zustandStore/useAuth";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

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
    <>
    {toast.error('login to view page')}
    <Navigate to=".." />
    </>
    
    
  );
};

export default PrivateRoute;
