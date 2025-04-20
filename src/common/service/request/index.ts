/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { BASE_URL as API_URL, REQUEST_TIMEOUT } from "../config/constant";
import { fetchUserToken, clearData } from "../storage/index";
import * as tp from "../../types";

/** general headers **/
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

/** authorization header for logged in user **/
const setAuthorization = () => {
  const authorize = {
    Authorization: `Bearer ${fetchUserToken()}`,
  };

  return authorize;
};

/** axios instance **/
export const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers,
  withCredentials: false,
});

/** timeout configuration for axios instance **/
instance.defaults.timeout = REQUEST_TIMEOUT;

// Create a cancellation token source
const cancelTokenSource = axios.CancelToken.source();

// Set the cancellation token as a default config option for the instance
instance.defaults.cancelToken = cancelTokenSource.token;

instance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      // config.headers["Cancel-Token"] = cancelTokenSource.token as any;
      // config.cancelToken = cancelTokenSource.token;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Export the cancellation token source
export const cancelToken = cancelTokenSource;

instance.interceptors.request.use(
  function (config) {
    const token = fetchUserToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

/** axios interceptor to trigger a logout on unauthorized error response code **/
instance.interceptors.response.use(
  ({ data }: AxiosResponse): AxiosResponse<tp.APIResponseSuccessModel> => {
    return data;
  },
  (error: AxiosError) => {
    if (error.code === "ERR_CANCELED") {
      return Promise.reject({});
    }
    if (error.code === "ERR_NETWORK") {
      return Promise.reject({ message: "Failed Request, Please try again" });
    }
    if (error.response?.status !== undefined && error.response.status >= 500) {
      return Promise.reject({
        message:
          "Unable to complete the request at this time, Please try again",
      });
    }
    if (error.response?.status === 401) {
      const isAuthRoute = error.config?.url?.includes("/auth/");
      const isRefreshRoute = error.config?.url?.includes("refresh/token");
      if (isRefreshRoute || !isAuthRoute) {
        clearData();
        window.location.replace("/auth/login");
      }
      if (!isAuthRoute) {
        // window.location.reload();
        return;
      }
    }

    return Promise.reject(
      error
        ? error.response
          ? error.response.data
          : { message: "Something went Wrong" }
        : { message: "Something went Wrong" }
    );
  }
);

export const makeGetRequest = async (
  url: string,
  args: tp.ServiceType
): Promise<tp.APIResponseSuccessModel<any>> => {
  const finalHeaders = args.isAuthoried
    ? { ...headers, ...setAuthorization() }
    : headers;
  return await instance.request({
    method: "get",
    url,
    headers: finalHeaders,
  });
};

export const makeRequest = async (
  url: string,
  arg: tp.ServiceType
): Promise<tp.APIResponseSuccessModel<any>> => {
  const finalHeaders = arg.isAuthoried
    ? { ...headers, ...setAuthorization() }
    : headers;
  return await instance.request({
    method: arg?.method || "post",
    url: url,
    data: arg?.data,
    headers: finalHeaders,
  });
};

export const queryHandler = (
  req: Record<string, string | number | undefined>
) => {
  let params = "";
  const keys = Object.keys(req) as Array<keyof typeof req>;
  keys.forEach((key) => {
    if (req[key]) {
      if (params.length === 0) {
        params += "?";
      } else {
        params += "&";
      }

      params += `${key}=${req[key]}`;
    }
  });
  return params;
};

export const searchQueryHandler = (searchBy: string[], value: string) => {
  const clean = searchBy.filter((itm) => itm !== "");
  if (value === "" || clean.length === 0) return "";
  const searchObj: Record<string, string> = {};

  clean.forEach((item) => {
    searchObj[item] = value;
  });

  return JSON.stringify(searchObj);
};
