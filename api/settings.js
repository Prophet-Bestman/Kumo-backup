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

export const useGetPaypal = () => {
  const headers = configOptions();
  return useQuery("paypal", () =>
    request.get(`/get-paypal`, { headers: headers }).then((res) => res.data)
  );
};

export const useGetBaseCurrency = () => {
  const headers = configOptions();
  return useQuery("base-currency", () =>
    request2
      .get(`/get-base-currency`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useGetUtilities = () => {
  const headers = configOptions();
  return useQuery("utilities", () =>
    request2
      .get(`/get-utilities-state`, { headers: headers })
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
        queryClient.invalidateQueries("currencies");
      },
    }
  );
};

export const useUpdateUtility = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .put(`/update-utilities-state`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("utilities");
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

export const useDeleteUtility = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .delete(
          `/delete-utilities-state?utility_name=${values?.utility_name}`,
          {
            headers: headers,
          }
        )
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("utilities");
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

export const useGetExternalCoins = (searchText) => {
  const headers = configOptions();

  return useQuery(
    ["external-coins"],
    () =>
      request2
        .get(
          `/get-external-coin-listing?item_per_page=50&q=${searchText || ""}`,
          {
            headers: headers,
          }
        )
        .then((res) => res.data),
    { refetchOnWindowFocus: false }
  );
};

export const useGetAllCoinListing = () => {
  const headers = configOptions();
  return useQuery("coin-listings", () =>
    request2
      .get(`/get-all-coin-listings`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useAddCoinToListing = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .post(`/add-coin-to-listing`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("coin-listings");
      },
    }
  );
};

export const useRemoveCoinFromListing = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .delete(`/remove-coin-from-listing?coin_id=${values}`, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("coin-listing");
      },
    }
  );
};

export const useGetCryptoTokens = () => {
  const headers = configOptions();
  return useQuery(
    ["crypto-tokens"],
    () =>
      request2
        .get(`/get-all-tokens?item_per_page=50`, {
          headers: headers,
        })
        .then((res) => {
          return res.data;
        }),
    { refetchOnWindowFocus: false }
  );
};

export const useGetAllListedTokens = () => {
  const headers = configOptions();
  return useQuery(
    ["listed-tokens"],
    () =>
      request2
        .get(`/get-all-list-tokens?item_per_page=50`, {
          headers: headers,
        })
        .then((res) => {
          return res.data;
        }),
    { refetchOnWindowFocus: false }
  );
};

export const useCreateToken = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .post(`/create-token`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("crypto-tokens");
        queryClient.invalidateQueries("listed-tokens");
      },
    }
  );
};

export const useUpdateCryptoToken = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .put(`/update-token?token_id=${values?.token_id}`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("crypto-tokens");
        queryClient.invalidateQueries("listed-tokens");
      },
    }
  );
};

export const useListUnlistToken = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .put(`/list-unlist-token?token_id=${values?.token_id}`, values?.data, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("crypto-tokens");
        queryClient.invalidateQueries("listed-tokens");
      },
    }
  );
};

export const useDeleteCryptotToken = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .delete(`/delete-token?token_id=${values}`, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("crypto-tokens");
        queryClient.invalidateQueries("listed-tokens");
      },
    }
  );
};

export const useUpdateBaseCurrency = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .put(`/add-base-currency`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("base-currency");
      },
    }
  );
};

export const useDeleteBaseCurrency = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .delete(`/delete-base-currency?code=${values}`, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("base-currency");
      },
    }
  );
};

export const useGetCoinRate = () => {
  const headers = configOptions();
  return useQuery(["coin-rate"], () =>
    request.get(`/get-coin-rate`, { headers: headers }).then((res) => res.data)
  );
};

export const useSetCoinRate = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .post(`/set-coin-rate`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("coin-rate");
      },
    }
  );
};

export const useGetTokenRate = () => {
  const headers = configOptions();
  return useQuery(["token-rate"], () =>
    request.get(`/get-token-rate`, { headers: headers }).then((res) => res.data)
  );
};

export const useSetTokenRate = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request2
        .post(`/set-token-rate`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("token-rate");
      },
    }
  );
};
