import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { baseUrl } from "./baseUrl";
import configOptions from "./config";

const request = axios.create({
  baseURL: baseUrl + "/app/settings",
});
const request2 = axios.create({
  baseURL: baseUrl + "/admin/settings",
});

export const useGetAllFees = () => {
  const headers = configOptions();
  return useQuery("fee-costs", () =>
    request
      .get(`/get-all-settings`, { headers: headers })
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

export const useUpdateCryptoAddress = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .put(`/add-crypto-address`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fee-costs");
      },
    }
  );
};

export const useUpdateUsdToDollar = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .put(`/update-kumo-usd-ngn`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fee-costs");
      },
    }
  );
};

export const useUpdateSendCryptoFee = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .put(`/update-send-crypto-fee`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fee-costs");
      },
    }
  );
};

export const useUpdateSellCryptoFee = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .put(`/update-sell-crypto-fee`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fee-costs");
      },
    }
  );
};

export const useUpdateGeneralFee = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .put(`/update-general-fee`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fee-costs");
      },
    }
  );
};
