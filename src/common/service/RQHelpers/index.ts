import { useMutation, useQuery } from "@tanstack/react-query";
import { makeGetRequest, makeRequest } from "../request/index";
import {
  QueryOptions,
  APIError,
  APIResponse,
  QueryKey,
  MutationOptions,
  RequestPayload,
} from "../../types";

export const useGetRequest = <T>(
  key: string,
  path: string,
  options?: QueryOptions<T>
) => {
  return useQuery<APIResponse<T>, APIError, APIResponse<T>, QueryKey>({
    queryKey: [key],
    queryFn: () => makeGetRequest(path, { isAuthoried: false }),
    ...options,
  });
};

export const useAuthGetRequest = <T>(
  key: string,
  path: string,
  options?: QueryOptions<T>
) => {
  return useQuery<APIResponse<T>, APIError, APIResponse<T>, QueryKey>({
    queryKey: [key],
    queryFn: () => makeGetRequest(path, { isAuthoried: true }),
    ...options,
  });
};

export const useRequest = <R, P>(
  path: string,
  options?: MutationOptions<R, RequestPayload<P>>
) => {
  return useMutation<APIResponse<R>, APIError, RequestPayload<P>>({
    mutationFn: ({ data, method }) =>
      makeRequest(path, { method, data, isAuthoried: false }),
    ...options,
  });
};

export const useAuthRequest = <R, P>(
  path: string,
  options?: MutationOptions<R, RequestPayload<P>>
) => {
  return useMutation<APIResponse<R>, APIError, RequestPayload<P>>({
    mutationFn: ({ data, method }) =>
      makeRequest(path, { method, data, isAuthoried: true }),
    ...options,
  });
};
