import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { baseUrl } from "./baseUrl";
import configOptions from "./config";

const request = axios.create({
  baseURL: baseUrl + "/admin/utilities",
});
const request1 = axios.create({
  baseURL: baseUrl + "/app/utilities",
});

export const useFundWallet = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/fund-user-wallet?user_id=${values?._id}`, values?.data, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        queryClient.invalidateQueries("single-user");
      },
    }
  );
};

export const useDebitWallet = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/debit-user-wallet?user_id=${values?._id}`, values?.data, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        queryClient.invalidateQueries("single-user");
      },
    }
  );
};

export const useGetAirtimeList = () => {
  const headers = configOptions();
  return useQuery("airtime-list", () =>
    request1
      .get(`/get-airtime-network-list`, { headers: headers })
      .then((res) => res.data)
  );
};
