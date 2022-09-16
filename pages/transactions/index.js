import { Box, Grid, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { CustomTabList } from "components";
import {
  DebitAndCredit,
  TransactionsTable,
} from "components/TransactionHistory";
import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect } from "react";

const TransactionsPage = () => {
  const { setActiveNav } = useNavContext();
  useEffect(() => {
    setActiveNav(navStates?.transactions);
  }, []);

  const tabs = [{ title: "All" }, { title: "Debits" }, { title: "Credits" }];

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
              <TransactionsTable />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TransactionsPage;

TransactionsPage.requireAuth = true;
