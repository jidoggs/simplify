import { GenericServiceParam } from "../types";

type QueryType = "search" | "status" | "date";
type NumberType = "page" | "limit";

type RequestType = "canGetTransactions";

export type TransactionArgs = GenericServiceParam<
  RequestType,
  QueryType,
  NumberType
>;
