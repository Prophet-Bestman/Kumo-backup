import { Circle, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";

const RecentTransaction = () => {
  return (
    <Grid
      templateColumns={["repeat(7, 1fr)"]}
      bg="app.primaryTrans"
      rounded="md"
      p="2"
      gap="3"
    >
      <GridItem colSpan={2}>
        <Circle
          rounded="md"
          color="white"
          bg="app.primary.900"
          size="36px"
          fontSize="13px"
          lineHeight="0"
          fontWeight={700}
        >
          HU
        </Circle>
      </GridItem>
      <GridItem
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        colSpan={5}
      >
        <Text fontSize="13px" fontWeight={700} color="app.primary.900">
          huh89yh87
        </Text>
        <Text fontSize="10px">ETH Address</Text>
      </GridItem>
    </Grid>
  );
};

export default RecentTransaction;
