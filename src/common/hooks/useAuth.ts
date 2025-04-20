import { useNavigate } from "react-router-dom";
import { endpoints } from "../service/config/endpoint";
import { routeLinks } from "../routes/route-links";
import { storeUserTokens, clearUserToken } from "../service/storage";
import { useRequest, useGetRequest } from "../service/RQHelpers";
import { LoginFormType } from "../../app/public/auth/login/form/schema";
import { message } from "antd";

const { LOGIN, USER } = endpoints.AUTH;

type User = {
  firstname: string;
  lastname: string;
  email: string;
  access_token: string;
};

function useAuth() {
  const navigate = useNavigate();

  const loginRQ = useRequest<User, LoginFormType>(LOGIN, {
    onSuccess: (res, payload) => {
      if (res?.data?.access_token) {
        storeUserTokens(
          res?.data?.access_token,
          payload?.data?.remember || false
        );
        navigate(routeLinks.protected.transactions.list, { replace: true });
      }
    },
    onError(data) {
      message.error(data.message);
    },
  });

  const profileRQ = useGetRequest<User>("profile", USER, {
    enabled: false,
  });

  const logoutHandler = () => {
    clearUserToken();
    navigate(routeLinks.auth.login, { replace: true });
  };

  return {
    loginRQ,
    profileRQ,
    logoutHandler,
  };
}

export default useAuth;
