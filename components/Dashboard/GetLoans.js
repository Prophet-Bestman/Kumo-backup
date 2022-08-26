import { Box, Circle, Grid, GridItem, Img, Text } from "@chakra-ui/react";
import React from "react";
import { MdArrowForwardIos } from "react-icons/md";

const GetLoans = () => {
  return (
    <Grid
      mt="5"
      w="90%"
      pt="6"
      pl="6"
      rounded="lg"
      bg="#BBF6D6"
      templateColumns={["repeat(5, 1fr)"]}
      gap="8"
      pos="relative"
    >
      <GridItem colSpan={3} pb="6">
        <Text fontSize="32px" fontWeight={700}>
          Get loans on Kurepay Now!
        </Text>

        <Text>Start winning prizes too</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Img src="/img/get_loans.png" h="full" />
      </GridItem>
      <Circle
        pos="absolute"
        bg="white"
        size="56px"
        shadow="xl"
        right="-30px"
        top="50%"
        transform={"translateY(-50%)"}
        color="app.primary.900"
      >
        <MdArrowForwardIos size="24px" />
      </Circle>
    </Grid>
  );
};

export default GetLoans;
