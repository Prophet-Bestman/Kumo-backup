import { Box, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import CustomTabList from "components/CustomTabList";
import {
  DebitAndCredit,
  TransactionsTable,
} from "components/TransactionHistory";
import React from "react";

const DashboardTransactions = () => {
  const tabs = [{ title: "All" }, { title: "Debits" }, { title: "Credits" }];
  return (
    <Box>
      <Text fontSize="14px" textAlign="center" mb="7">
        Transaction History
      </Text>

      <DebitAndCredit />
      <Tabs variant="unstyled" mt="50px">
        <CustomTabList tabList={tabs} size="sm" px="70px" />
        <TabPanels>
          <TabPanel>
            <Box>
              <TransactionsTable />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default DashboardTransactions;
