import { Circle, Grid, GridItem, Img, Text } from "@chakra-ui/react";
import React from "react";
import { RiShareForwardLine } from "react-icons/ri";

const ReferAndWin = () => {
  return (
    <Grid
      mb="5"
      w="90%"
      pos="relative"
      pt="6"
      pl="6"
      rounded="lg"
      bg="#F6F3BB"
      templateColumns={["repeat(5, 1fr)"]}
      gap="8"
    >
      <GridItem colSpan={3} pb="6">
        <Text fontSize="32px" fontWeight={700}>
          Refer your friends and Win!
        </Text>

        <Text>Click this board and share</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Img src="/img/refer_and_win.png" h="full" />
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
        <RiShareForwardLine size="24px" />
      </Circle>
    </Grid>
  );
};

export default ReferAndWin;
