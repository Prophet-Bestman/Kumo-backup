import { Box, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { FaStoreAlt } from "react-icons/fa";
import { AiFillWallet } from "react-icons/ai";
import { RiSendPlaneFill } from "react-icons/ri";
import QuickAction from "./QuickAction";
import { MdHotel, MdOutlineFlight, MdQrCode2 } from "react-icons/md";
import { BsPhoneFill } from "react-icons/bs";
import { GiVolleyballBall } from "react-icons/gi";

const QuickActions = () => {
  const actions = [
    {
      title: "Buy/Sell Crypto",
      icon: <FaStoreAlt fontSize="24px" />,
    },
    {
      title: "Send/Receive Crypto",
      icon: <MdQrCode2 fontSize="24px" />,
    },
    {
      title: "Transfer Money",
      icon: <RiSendPlaneFill fontSize="24px" />,
    },
    {
      title: "Fund my wallet",
      icon: <AiFillWallet fontSize="24px" />,
    },
    {
      title: "Sports Betting",
      icon: <GiVolleyballBall fontSize="24px" />,
    },
    {
      title: "Buy Airtime/Data",
      icon: <BsPhoneFill fontSize="24px" />,
    },
    {
      title: "Book an Hotel",
      icon: <MdHotel fontSize="24px" />,
    },
    {
      title: "Flights and Transportation",
      icon: <MdOutlineFlight fontSize="24px" />,
    },
  ];
  return (
    <Box mt="4">
      <Text mb="4" fontSize="14px" fontWeight="700">
        Quick Action
      </Text>
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap="3"
        p="6"
        bg="white"
        rounded="md"
        shadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;"
      >
        {actions?.length > 0 &&
          actions?.map((action, i) => <QuickAction key={i} action={action} />)}
      </Grid>
    </Box>
  );
};

export default QuickActions;
