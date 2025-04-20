import { endpoints } from "../service/config/endpoint";
import { keepPreviousData } from "@tanstack/react-query";
import { useGetRequest, useRequest } from "../service/RQHelpers";
import { useNavigate } from "react-router-dom";
import { routeLinks } from "../routes/route-links";
import { message } from "antd";
import { queryHandler } from "../service/request";
import { TransactionArgs } from "./type";

const { LIST } = endpoints.TRANSACTIONS;

export type Transaction = {
  id: string;
  amount: number;
  status: string;
  date: string;
};

function useTransaction(args?: TransactionArgs) {
  const query = {
    status: args?.status,
    search: args?.search,
    date: args?.date,
    page: args?.page,
    limit: args?.limit,
  };

  const queries = queryHandler({ ...query });
  const navigate = useNavigate();

  const getTransactionsRQ = useGetRequest<Transaction[]>(
    "transactions" + queries,
    LIST + queries,
    {
      enabled: args?.canGetTransactions || false,
      placeholderData: keepPreviousData,
      retryOnMount: false,
      refetchOnMount: false,
    }
  );

  const createTransactionRQ = useRequest<Omit<Transaction, "id">, Transaction>(
    LIST,
    {
      onSuccess: (data) => {
        message.success(data?.message);
        getTransactionsRQ.refetch();
        navigate(routeLinks.protected.transactions.list);
      },
    }
  );

  return { getTransactionsRQ, createTransactionRQ };
}

export default useTransaction;
