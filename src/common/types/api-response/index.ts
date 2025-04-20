export type APIResponseSuccessModel<T = unknown> = {
    results?: number;
    data: T;
    message: string;
    success: true;
  };
  export type APIResponseErrorModel = {
    data: null;
    message: string;
    error: true;
  };
  
  export type Promolve<ResT = void, RejT = Error> = {
    promise: Promise<ResT>;
    resolve: (value: ResT | PromiseLike<ResT>) => void;
    reject: (value: RejT) => void;
  };
  
  type StringData = "createdAt" | "delatedAt" | "_id" | "updatedAt";
  type BooleanData = "active" | "is_deleted";
  
  export type BaseDataType = StringData | BooleanData;
  
  export type BaseDataModel = Record<StringData, string> &
    Record<BooleanData, boolean>;
  
  export type BasicTypeSet = {
    name: string;
    _id: string;
  };
  
  export type PaginatedData<T> = {
    page: number;
    limit: number;
    total: number;
    list: Array<T>;
  };
  