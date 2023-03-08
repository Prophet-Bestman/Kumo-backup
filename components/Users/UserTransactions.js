import { Progress } from "@chakra-ui/react";
import { useGetAllCoinListing, useGetCryptoTokens } from "api/settings";
import { useGetTransactions, useGetTransactionsSize } from "api/transactions";
import LargeHeading from "components/LargeHeading";
import Pagination from "components/Pagination";
import { TransactionHistoryTable } from "components/TransactionHistory";
import React, { useEffect, useState } from "react";

const UserTransactions = ({ user }) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [wallets, setWallets] = useState([]);

  const {
    data: transactionsData,
    refetch,
    isLoading,
  } = useGetTransactions(page, user?.email);

  //  ============= PAGINATION LOGIC ===============
  const { data: countResp } = useGetTransactionsSize(user?.email);

  useEffect(() => {
    if (!!countResp && countResp?.status === "success") {
      setPages(Math.ceil(countResp?.data?.total / 30));
    }
  }, [countResp]);

  useEffect(() => {
    refetch();
  }, [page]);
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

  return (
    <div>
      <LargeHeading mb="4">Transaction History</LargeHeading>

      <TransactionHistoryTable
        transactions={transactionsData?.data}
        isLoading={isLoading || loadingCoins || loadingCrypto}
        wallets={wallets}
      />

      <Pagination page={page} pages={pages} setPage={setPage} />
    </div>
  );
};

export default UserTransactions;
