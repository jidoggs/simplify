import { useNavigate } from "react-router-dom";
import { endpoints } from "../service/config/endpoint";
import { routeLinks } from "../routes/route-links";
import { storeUserTokens } from "../service/storage";
import { useRequest } from "../service/RQHelpers";
import { LoginFormType } from "../../app/public/auth/login/form/schema";
import { message } from "antd";

const { LOGIN } = endpoints.AUTH;

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
      storeUserTokens(
        res?.data?.access_token,
        payload?.data?.remember || false
      );
      navigate(routeLinks.protected.transactions.list, { replace: true });
    },
    onError(data) {
      message.error(data.message);
    },
    onMutate() {
      navigate(routeLinks.protected.transactions.list, { replace: true });
    },
  });

  return {
    loginRQ,
  };
}

export default useAuth;
