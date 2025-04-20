import {
  APIResponseErrorModel,
  APIResponseSuccessModel,
} from "../api-response";
import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type QueryMethod = "post" | "put" | "patch" | "delete";

export type APIResponse<T> = APIResponseSuccessModel<T>;
export type APIError = AxiosError<APIResponseErrorModel>;

export type QueryKey = [string];

export type QueryOptions<T> = Omit<
  UseQueryOptions<APIResponse<T>, APIError, APIResponse<T>, QueryKey>,
  "queryKey" | "queryFn"
>;

export type MutationOptions<T, U> = Omit<
  UseMutationOptions<APIResponse<T>, APIError, U>,
  "mutationFn"
>;

export type RequestPayload<P> = {
  data?: P;
  method?: QueryMethod;
};

export interface ServiceType extends RequestPayload<unknown> {
  isAuthoried: boolean;
}

export type GenericServiceParam<
  Selector extends string,
  StringQuery extends string,
  Pagination extends string = never
> = Partial<Record<Selector, boolean>> &
  Partial<Record<StringQuery, string>> &
  Partial<Record<Pagination, number>>;
