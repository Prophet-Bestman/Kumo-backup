import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { successToastConfig } from "utils/constants";
import { baseUrl } from "./baseUrl";
import configOptions from "./config";

const request = baseUrl + "/app/settings";
// const request2 = axios.create({
//   baseURL: baseUrl + "/admin/settings",
// });
const request2 = baseUrl + "/admin/settings";

export const useGetAllFees = () => {
  const headers = configOptions();
  return useQuery("fee-costs", () =>
    axios
      .get(`${request2}/get-all-settings`, { headers: headers })
      .then((res) => res.data)
  );
};
export const useGetAllMinMax = () => {
  const headers = configOptions();
  return useQuery("all-min-max", () =>
    axios
      .get(`${request2}/get-all-transaction-minmax`, { headers: headers })
      .then((res) => res.data)
  );
};
export const useGetSendMinMax = () => {
  const headers = configOptions();
  return useQuery("send-min-max", () =>
    axios
      .get(`${request2}/get-transaction-minmax?transaction_name=SEND_MIN_MAX`, {
        headers: headers,
      })
      .then((res) => res.data)
  );
};

export const useGetPaypal = () => {
  const headers = configOptions();
  return useQuery("paypal", () =>
    axios
      .get(`${request}/get-paypal`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useGetPaypalRange = () => {
  const headers = configOptions();
  return useQuery("paypal-range", () =>
    axios
      .get(`${request}/get-paypal-fee-range`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useGetBaseCurrency = () => {
  const headers = configOptions();
  return useQuery("base-currency", () =>
    axios
      .get(`${request2}/get-base-currency`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useGetUtilities = () => {
  const headers = configOptions();
  return useQuery("utilities", () =>
    axios
      .get(`${request2}/get-utilities-state`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useGetCurrencies = () => {
  const headers = configOptions();
  return useQuery("currencies", () =>
    axios
      .get(`${request2}/get-currency`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useGetSingleTransaction = (id) => {
  const headers = configOptions();
  return useQuery(["single-transaction", id], () =>
    axios
      .get(`${request}/get-transaction/${id || ""}`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useGetCryptoAddresses = () => {
  const headers = configOptions();
  return useQuery("crypto-addresses", () =>
    axios
      .get(`${request}/get-crypto-addresses`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useUpdateCryptoAddress = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      axios
        .put(`${request2}/add-crypto-address`, values, {
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
      axios
        .put(`${request2}/add-currency`, values, {
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
      axios
        .put(`${request2}/update-utilities-state`, values, {
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
      axios
        .put(`${request2}/update-kumo-usd-ngn`, values, {
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
      axios
        .put(`${request2}/update-paypal`, values, {
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
      axios
        .put(`${request2}/update-send-crypto-fee`, values, {
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
      axios
        .put(`${request2}/update-sell-crypto-fee`, values, {
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
      axios
        .put(`${request2}/update-general-fee`, values, {
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
      axios
        .put(`${request2}/update-fund-wallet-fee`, values, {
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
      axios
        .delete(
          `${request2}/delete-utilities-state?utility_name=${values?.utility_name}`,
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
      axios
        .delete(
          `${request2}/delete-crypto-address?coin_name=${values?.coin_name}`,
          {
            headers: headers,
          }
        )
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
      axios
        .delete(`${request2}/delete-currency?currency_name=${values}`, {
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
      axios
        .get(
          `${request2}/get-external-coin-listing?item_per_page=50&q=${
            searchText || ""
          }`,
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
    axios
      .get(`${request2}/get-all-coin-listings`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useAddCoinToListing = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      axios
        .post(`${request2}/add-coin-to-listing`, values, {
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
      axios
        .delete(`${request2}/remove-coin-from-listing?coin_id=${values}`, {
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
      axios
        .get(`${request2}/get-all-tokens?item_per_page=50`, {
          headers: headers,
        })
        .then((res) => {
          return res.data;
        }),
    { refetchOnWindowFocus: false }
  );
};

export const useGetAllDelistedTokens = () => {
  const headers = configOptions();
  return useQuery(
    ["delisted-tokens"],
    () =>
      axios
        .get(`${request2}/get-all-delist-tokens`, {
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
      axios
        .get(`${request2}/get-all-list-tokens`, {
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
      axios
        .post(`${request2}/create-token`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("crypto-tokens");
        queryClient.invalidateQueries("listed-tokens");
        queryClient.invalidateQueries("delisted-tokens");
      },
    }
  );
};

export const useUpdateCryptoToken = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      axios
        .put(`${request2}/update-token?token_id=${values?.token_id}`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("crypto-tokens");
        queryClient.invalidateQueries("listed-tokens");
        queryClient.invalidateQueries("delisted-tokens");
      },
    }
  );
};

export const useListUnlistToken = () => {
  const toast = useToast();
  const successToast = (msg) => {
    toast({
      title: "Action Successful",
      description: msg,
      ...successToastConfig,
    });
  };

  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      axios
        .put(
          `${request2}/list-unlist-token?token_id=${values?.token_id}`,
          values?.data,
          {
            headers: headers,
          }
        )
        .then((res) => res.data),
    {
      onSuccess: () => {
        successToast("Successfully Delisted token ");
        queryClient.invalidateQueries("crypto-tokens");
        queryClient.invalidateQueries("listed-tokens");
        queryClient.invalidateQueries("delisted-tokens");
      },
    }
  );
};

export const useListToken = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  const toast = useToast();

  const successToast = (msg) => {
    toast({
      title: "Action Successful",
      description: msg,
      ...successToastConfig,
    });
  };

  return useMutation(
    (values) =>
      axios
        .put(
          `${request2}/list-token?token_id=${values?.token_id}`,
          {},
          {
            headers: headers,
          }
        )
        .then((res) => res.data),
    {
      onSuccess: () => {
        successToast("Successfully Listed token");
        queryClient.invalidateQueries("crypto-tokens");
        queryClient.invalidateQueries("listed-tokens");
        queryClient.invalidateQueries("delisted-tokens");
      },
    }
  );
};

export const useDelistToken = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  const toast = useToast();

  const successToast = (msg) => {
    toast({
      title: "Action Successful",
      description: msg,
      ...successToastConfig,
    });
  };

  return useMutation(
    (values) =>
      axios
        .put(
          `${request2}/delist-token?token_id=${values?.token_id}`,
          {},
          {
            headers: headers,
          }
        )
        .then((res) => res.data),
    {
      onSuccess: () => {
        successToast("Successfully Delisted token ");
        queryClient.invalidateQueries("crypto-tokens");
        queryClient.invalidateQueries("listed-tokens");
        queryClient.invalidateQueries("delisted-tokens");
      },
    }
  );
};

export const useDeleteCryptotToken = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  const toast = useToast();

  const successToast = (msg) => {
    toast({
      title: "Action Successful",
      description: msg,
      ...successToastConfig,
    });
  };

  return useMutation(
    (values) =>
      axios
        .delete(`${request2}/delete-token?token_id=${values}`, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        successToast("Successfully Deleted token ");
        queryClient.invalidateQueries("crypto-tokens");
        queryClient.invalidateQueries("listed-tokens");
        queryClient.invalidateQueries("delisted-tokens");
      },
    }
  );
};

export const useUpdateBaseCurrency = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      axios
        .put(
          `${request2}/update-base-currency?currency_id=${values.id}`,
          values.data,
          {
            headers: headers,
          }
        )
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("base-currency");
      },
    }
  );
};

export const useAddBaseCurrency = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      axios
        .put(`${request2}/add-base-currency`, values, {
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
      axios
        .delete(`${request2}/delete-base-currency?currency_id=${values}`, {
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
    axios
      .get(`${request}/get-coin-rate`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useSetCoinRate = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      axios
        .post(`${request2}/set-coin-rate`, values, {
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
    axios
      .get(`${request}/get-token-rate`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useSetTokenRate = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      axios
        .post(`${request2}/set-token-rate`, values, {
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

export const useUpdateMinMax = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      axios
        .put(`${request2}/update-transaction-minmax`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-min-max");
        queryClient.invalidateQueries("send-min-max");
      },
    }
  );
};

export const useUpdateSendMinMax = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      axios
        .put(`${request2}/update-individual-transaction-minmax`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-min-max");
        queryClient.invalidateQueries("send-min-max");
      },
    }
  );
};

export const useUpdatePaypalRange = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      axios
        .put(`${request2}/set-paypal-fee-range`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("paypal-range");
      },
    }
  );
};

export const useGetDisabledOperation = () => {
  const headers = configOptions();
  return useQuery(["disabled-operation"], () =>
    axios
      .get(`${request2}/get-disabled-operation`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useEnableUtility = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      axios
        .put(
          `${request2}/remove-disabled-operation?service_id=${values?.service_id}`,
          {},
          {
            headers: headers,
          }
        )
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("airtime-list");
        queryClient.invalidateQueries("disabled-operation");
      },
    }
  );
};

export const useDisableUtility = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      axios
        .put(`${request2}/add-disabled-operation`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("airtime-list");
        queryClient.invalidateQueries("disabled-operation");
      },
    }
  );
};
