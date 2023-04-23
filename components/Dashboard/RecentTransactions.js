import { Box, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { MdOutlineHistory } from "react-icons/md";
import GetLoans from "./GetLoans";
import RecentTransaction from "./RecentTransaction";

const RecentTransactions = () => {
  return (
    <Box mt="30px">
      <Text mb="4" fontSize="14px" fontWeight="700">
        Send Money
      </Text>

      <Box
        px="7"
        py="8"
        bg="white"
        rounded="md"
        shadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;"
      >
        <Text
          mb="4"
          fontWeight={300}
          color="app.primary.900"
          fontSize="12px"
          display="flex"
          gap="2"
          fontStyle="italic"
          alignItems="center"
        >
          <MdOutlineHistory fontSize="18px" />
          Recent
        </Text>
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap="3"
        >
          <RecentTransaction />
          <RecentTransaction />
          <RecentTransaction />
          <RecentTransaction />
          <RecentTransaction />
          <RecentTransaction />
        </Grid>
        {/* <GetLoans /> */}
      </Box>
    </Box>
  );
};

export default RecentTransactions;
