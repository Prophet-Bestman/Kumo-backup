import { Box, Flex, Grid, Img, Text } from "@chakra-ui/react";
import React from "react";
import ReferAndWin from "./ReferAndWin";

const PayWithKumo = () => {
  const actions = [
    {
      title: "Buy Data",
      img: "/img/Device.png",
    },
    {
      title: "Take a Loan",
      img: "/img/Group 7.png",
    },
    {
      title: "Buy Electricity",
      img: "/img/charger station.png",
    },
    {
      title: "Send SMS",
      img: "/img/mail.png",
    },
  ];
  return (
    <Box mt="30px">
      <Text mb="4" fontSize="14px" fontWeight="700">
        Pay with Kumo
      </Text>

      <Box
        px="7"
        py="4"
        bg="white"
        rounded="md"
        shadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;"
      >
        <ReferAndWin />
        <Grid templateColumns={["repeat(2, 1fr)", , "repeat(4, 1fr)"]} gap="3">
          {actions?.length > 0 &&
            actions?.map((action, i) => (
              <Flex
                key={i}
                flexDir="column"
                justify="center"
                alignItems="center"
                bg="#E5F3D4"
                minH="150px"
                px="4"
                py="5"
                rounded="md"
              >
                <Flex my="auto" justify="center">
                  <Img src={action.img} />
                </Flex>

                <Text
                  mt="auto"
                  textAlign="center"
                  color="app.primary.900"
                  fontSize="12px"
                  fontWeight={500}
                >
                  {action.title}
                </Text>
              </Flex>
            ))}
        </Grid>
        {/* <Box h="4"></Box> */}
      </Box>
    </Box>
  );
};

export default PayWithKumo;
