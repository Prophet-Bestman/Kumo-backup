import { Box, Grid, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useGetTransactions } from "api/transactions";
import { CustomTabList } from "components";
import {
  DebitAndCredit,
  TransactionsTable,
} from "components/TransactionHistory";
import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect, useState } from "react";

const TransactionsPage = () => {
  const { setActiveNav } = useNavContext();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setActiveNav(navStates?.transactions);
  }, []);

  const tabs = [{ title: "All" }, { title: "Debits" }, { title: "Credits" }];

  const { data: transactionsResp } = useGetTransactions();

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
          <CustomTabList
            tabList={tabs}
            size="lg"
            px="70px"
            justify="space-between"
            tabWidth="full"
          />
        </Grid>
        <TabPanels>
          <TabPanel>
            <Box mt="4">
              <TransactionsTable transactions={transactions} />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TransactionsPage;

TransactionsPage.requireAuth = true;
