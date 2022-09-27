import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { baseUrl } from "./baseUrl";
import configOptions from "./config";

const request = axios.create({
  baseURL: baseUrl + "/admin/transaction",
});

export const useGetTransactions = () => {
  const headers = configOptions();
  return useQuery("transactions", () =>
    request
      .get(`/get-transactions`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useGetSingleTransaction = (id) => {
  const headers = configOptions();
  return useQuery(["single-transaction", id], () =>
    request
      .get(`/get-transaction/${id || ""}`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/update-transaction?_id=${values?._id}`, values?.data, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("single-transaction");
        queryClient.invalidateQueries("transactions");
      },
    }
  );
};
