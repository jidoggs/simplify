import { endpoints } from "../service/config/endpoint";
import { useGetRequest, useRequest } from "../service/RQHelpers";

const { LIST } = endpoints.TRANSACTIONS;

function useTransaction() {
  const getTransactionsRQ = useGetRequest("transactions", LIST);

  const createTransactionRQ = useRequest(LIST, {});

  return { getTransactionsRQ, createTransactionRQ };
}

export default useTransaction;
