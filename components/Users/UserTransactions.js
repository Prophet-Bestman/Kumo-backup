import { Progress } from "@chakra-ui/react";
import { useGetTransactions, useGetTransactionsSize } from "api/transactions";
import LargeHeading from "components/LargeHeading";
import Pagination from "components/Pagination";
import { TransactionsTable } from "components/TransactionHistory";
import React, { useEffect, useState } from "react";

const UserTransactions = ({ user }) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
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

  return (
    <div>
      <LargeHeading mb="4">Transaction History</LargeHeading>
      {isLoading ? (
        <Progress isIndeterminate colorScheme={"gray"} />
      ) : (
        <>
          <TransactionsTable transactions={transactionsData?.data} />
        </>
      )}
      <Pagination page={page} pages={pages} setPage={setPage} />
    </div>
  );
};

export default UserTransactions;
