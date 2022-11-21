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
    request2
      .get(`/get-all-settings`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useGetCurrencies = () => {
  const headers = configOptions();
  return useQuery("currencies", () =>
    request2.get(`/get-currency`, { headers: headers }).then((res) => res.data)
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

export const useGetCryptoAddresses = () => {
  const headers = configOptions();
  return useQuery("crypto-addresses", () =>
    request
      .get(`/get-crypto-addresses`, { headers: headers })
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
        queryClient.invalidateQueries("crypto-addresses");
      },
    }
  );
};

export const useUpdateCurrency = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .put(`/add-currency`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("currency");
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

export const useUpdatePaypal = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .put(`/update-paypal`, values, {
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

export const useUpdateFundWalletFee = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .put(`/update-fund-wallet-fee`, values, {
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

export const useDeleteCryptoAddress = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .delete(`/delete-crypto-address?coin_name=${values?.coin_name}`, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("crypto-addresses");
      },
    }
  );
};

export const useDeleteCurrency = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .delete(`/delete-currency?currency_name=${values}`, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("currencies");
      },
    }
  );
};
