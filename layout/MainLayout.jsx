import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import customScrollBar, { customScrollBar2 } from "utils/styles";
import SideNav from "./SideNav";
import Topbar from "./Topbar";

export const navWidthStates = {
  stretched: "stretched",
  shrinked: "shrinked",
};

const MainLayout = ({ children }) => {
  const [navWidth, setNavWidth] = useState(navWidthStates?.stretched);
  const shrink = () => {
    setNavWidth(navWidthStates?.shrinked);
  };
  const stretch = () => {
    setNavWidth(navWidthStates?.stretched);
  };

  return (
    <Flex display="flex" justify="center">
      <Box w="full" minH={"100vh"} pos="relative" display="flex" maxW="1620px">
        <Box
          w={navWidth === "stretched" ? "15%" : "6%"}
          h="100vh"
          bg="app.primary.900"
          pos="absolute"
          top="0"
          left="0"
          overflowY="auto"
          sx={customScrollBar}
          transition="400ms all ease-in-out"
        >
          <SideNav stretch={stretch} shrink={shrink} navWidth={navWidth} />
        </Box>
        <Box
          w={navWidth === "stretched" ? "85%" : "94%"}
          pos="relative"
          top="0"
          left={navWidth === "stretched" ? "15%" : "6%"}
          sx={customScrollBar2}
          overflow="auto"
          h="100vh"
          transition="400ms all ease-in-out"
          bg="#FAFAFA"
        >
          <Box>
            <Topbar />

            {children}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default MainLayout;
