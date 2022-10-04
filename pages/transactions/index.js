import { Box, Grid, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useGetTransactions, useGetTransactionsSize } from "api/transactions";
import { CustomTabList, Pagination } from "components";
import {
  DebitAndCredit,
  TransactionsTable,
} from "components/TransactionHistory";
import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect, useState } from "react";

const TransactionsPage = () => {
  const { setActiveNav } = useNavContext();
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setActiveNav(navStates?.transactions);
  }, []);

  const tabs = [{ title: "All" }, { title: "Debits" }, { title: "Credits" }];

  const {
    data: transactionsResp,
    isLoading,
    refetch,
  } = useGetTransactions(page);

  //  ============= PAGINATION LOGIC ===============
  const { data: countResp } = useGetTransactionsSize();

  useEffect(() => {
    if (!!countResp && countResp?.status === "success") {
      setPages(Math.ceil(countResp?.data?.total / 20));
    }
  }, [countResp]);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (!!transactionsResp && transactionsResp?.status === "success") {
      // setTransactions(
      //   transactionsResp?.data?.filter(
      //     (transaction) => transaction?.type === "BUY CRYPTO"
      //   )
      // );
      setTransactions(transactionsResp?.data);
    }
  }, [transactionsResp]);

  return (
    <Box px="12">
      <Tabs variant="unstyled" mt="50px">
        <Grid templateColumns="repeat(2, 1fr)">
          <DebitAndCredit />
          {/* <CustomTabList
            tabList={tabs}
            size="lg"
            px="70px"
            justify="space-between"
            tabWidth="full"
          /> */}
        </Grid>
        <TabPanels>
          <TabPanel>
            <Box mt="4">
              <TransactionsTable
                page={page}
                pages={pages}
                transactions={transactions}
                isLoading={isLoading}
              />
              <Pagination page={page} pages={pages} setPage={setPage} />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TransactionsPage;

TransactionsPage.requireAuth = true;
