import { ReactNode } from "react";
import { fetchUserToken } from "../service/storage";
import { Navigate } from "react-router-dom";
import { routeLinks } from "../routes/route-links";
import { message } from "antd";

function AuthGuard({ children }: { children: ReactNode }) {
  const token = fetchUserToken();

  if (!token) {
    message.error("Unauthorized User");
    return <Navigate to={routeLinks.auth.login} replace />;
  }

  return <>{children}</>;
}

export default AuthGuard;
