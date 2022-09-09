import { Box, Circle, Grid, GridItem, Text } from "@chakra-ui/react";
import { TransactionBankDetails } from "components/TransactionHistory";
import React from "react";

const TransactionDetails = () => {
  return (
    <Box p="6" px="10">
      <Grid
        bg="white"
        py="12"
        px="8"
        templateColumns={"repeat(2, 1fr)"}
        w={["100%", , , "75%"]}
        gap="4"
      >
        <GridItem>
          <Grid
            templateColumns={["repeat(7, 1fr)"]}
            bg="app.primaryTrans"
            rounded="md"
            p="4"
            gap="3"
          >
            <GridItem colSpan={2}>
              <Circle
                rounded="md"
                color="white"
                bg="app.primary.900"
                size="58px"
                fontSize="18px"
                lineHeight="0"
                fontWeight={700}
              >
                OT
              </Circle>
            </GridItem>
            <GridItem display="flex" flexDir="column" colSpan={5} gap="2">
              <Text fontSize="16px" fontWeight={700} color="app.primary.900">
                Oloruntobi
              </Text>
              <Text fontSize="14px">Access Bank</Text>
            </GridItem>
          </Grid>
          <Box my="12">
            <Text textAlign="center" fontSize=" 32px" fontWeight={700}>
              N 45,000.00
            </Text>
          </Box>

          <Box
            my="4"
            color="app.primary.500"
            fontStyle="italic"
            fontSize="20px"
          >
            <Text mb="5">Transaction Completed</Text>

            <Text>Fri Aug 07, 2020</Text>
          </Box>
        </GridItem>

        <GridItem>
          <TransactionBankDetails />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default TransactionDetails;
