import { useRef } from "react";
import { endpoints } from "../service/config/endpoint";
import { useGetRequest, useRequest } from "../service/RQHelpers";

const { LIST } = endpoints.TRANSACTIONS;

type Transaction = {
  id: string;
  amount: number;
  status: string;
  date: string;
};

function useTransaction() {
  const locallyCreated = useRef<Transaction[]>([]);

  const getTransactionsRQ = useGetRequest<Transaction[]>("transactions", LIST, {
    select: (res) => {
      console.log(res);
      return {
        ...res,
        data: [...(res.data || []), ...locallyCreated.current],
      };
    },
    enabled: false,
  });

  const createTransactionRQ = useRequest<Transaction, Transaction>(LIST, {
    onSuccess: (_, variable) => {
      if (variable?.data) {
        locallyCreated.current.unshift(variable.data);
        getTransactionsRQ.refetch();
      }
    },
  });

  return { getTransactionsRQ, createTransactionRQ };
}

export default useTransaction;
