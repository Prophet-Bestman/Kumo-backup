import { Circle, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import {
  BsFillArrowDownLeftCircleFill,
  BsFillArrowUpRightCircleFill,
} from "react-icons/bs";

const DebitAndCredit = () => {
  return (
    <Grid templateColumns={["repeat(2, 1fr)"]} minH="70px">
      <GridItem borderColor="#33333344" borderRightWidth={"1px"} pl="12">
        <Flex alignItems="end" gap="2">
          <Circle rounded="md" bg="#17CD4A33" color="#17CD4A" size="32px">
            <BsFillArrowUpRightCircleFill fontSize="24px" />
          </Circle>
          <Text fontSize="11px" mb="2">
            Credits
          </Text>
        </Flex>

        <Text color="#17CD4A" fontWeight={700} fontSize="20px" mt="4">
          NGN 234,000
        </Text>
      </GridItem>
      <GridItem pl="12">
        <Flex alignItems="end" gap="2">
          <Circle rounded="md" bg="#DD6A5733" color="#DD6A57" size="32px">
            <BsFillArrowDownLeftCircleFill fontSize="24px" />
          </Circle>
          <Text fontSize="11px" mb="2">
            Debits
          </Text>
        </Flex>

        <Text color="#DD6A57" fontWeight={700} fontSize="20px" mt="4">
          NGN 1,234,00
        </Text>
      </GridItem>
    </Grid>
  );
};

export default DebitAndCredit;
