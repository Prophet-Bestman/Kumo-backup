import { Box, Text } from "@chakra-ui/react";
import { useGetAllCoinListing, useGetCryptoTokens } from "api/settings";
import { useGetTransactions, useGetTransactionsSize } from "api/transactions";
import { Pagination } from "components";
import { TransactionHistoryTable } from "components/TransactionHistory";
import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect, useState } from "react";

const DashboardTransactions = () => {
  const { setActiveNav } = useNavContext();
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    setActiveNav(navStates?.transactions);
  }, []);

  const { data: tokensResp, isLoading: loadingCrypto } = useGetCryptoTokens();
  const { data: coinsResp, isLoading: loadingCoins } = useGetAllCoinListing();

  useEffect(() => {
    if (!!tokensResp && tokensResp?.status === "success") {
      setWallets([...wallets, ...tokensResp?.data]);
    }
    if (!!coinsResp && coinsResp?.status === "success") {
      setWallets([...wallets, ...coinsResp?.data]);
    }
  }, [tokensResp, coinsResp]);

  const {
    data: transactionsResp,
    isLoading,
    refetch,
  } = useGetTransactions(page, null, 5);

  //  ============= PAGINATION LOGIC ===============
  const { data: countResp } = useGetTransactionsSize();

  useEffect(() => {
    if (!!countResp && countResp?.status === "success") {
      setPages(Math.ceil(countResp?.data?.total / 5));
    }
  }, [countResp]);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (!!transactionsResp && transactionsResp?.status === "success") {
      setTransactions(transactionsResp?.data);
    }
  }, [transactionsResp]);

  return (
    <Box overflowX="auto">
      <Text fontSize="14px" textAlign="center" mb="7">
        Latest Transactions
      </Text>

      <TransactionHistoryTable
        transactions={transactions}
        isLoading={isLoading || loadingCoins || loadingCrypto}
        wallets={wallets}
      />
      {/* <Pagination page={page} pages={pages} setPage={setPage} /> */}
    </Box>
  );
};

export default DashboardTransactions;
