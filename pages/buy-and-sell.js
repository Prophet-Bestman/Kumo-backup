import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { ActionOptions } from "components";
import { SelectCoin } from "components/BuyAndSell";
import RecentTransaction from "components/Dashboard/RecentTransaction";
import React, { useState } from "react";
import { BiHistory } from "react-icons/bi";

const BuyAndSell = () => {
  const [option, setOption] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const options = {
    send: "Send Crypto",
    recieve: "Receive Crypto",
    buy: "Buy Crypto",
    sell: "Sell Crypto",
  };
  return (
    <Box p="6">
      <Box my="12">
        <Flex gap="2" alignItems="center" color="app.primary.900">
          <BiHistory />
          <Text fontStyle="italic" fontSize="14px">
            Recent
          </Text>
        </Flex>

        <Flex my="4" gap="4">
          <RecentTransaction />
          <RecentTransaction />
          <RecentTransaction />
          <RecentTransaction />
          <RecentTransaction />
          <RecentTransaction />
        </Flex>
      </Box>

      <Grid templateColumns="repeat(3, 1fr)" gap="4">
        <GridItem>
          <ActionOptions
            options={options}
            setOption={setOption}
            title={"Make purchase"}
            subtitle="Select purchase  you want to make"
          />
        </GridItem>
        <GridItem>{option === options.buy && <SelectCoin />}</GridItem>
      </Grid>
    </Box>
  );
};

export default BuyAndSell;
