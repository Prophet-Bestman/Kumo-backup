import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import customScrollBar, { customScrollBar2 } from "utils/styles";
import SideNav from "./SideNav";
import Topbar from "./Topbar";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

export const navWidthStates = {
  stretched: "stretched",
  shrinked: "shrinked",
};

const MainLayout = ({ children }) => {
  const btnRef = React.useRef();
  const [navWidth, setNavWidth] = useState(navWidthStates?.stretched);

  const shrink = () => {
    setNavWidth(navWidthStates?.shrinked);
  };
  const stretch = () => {
    setNavWidth(navWidthStates?.stretched);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex display="flex" justify="center">
        <Box
          w="full"
          minH={"100vh"}
          pos="relative"
          display="flex"
          maxW="1620px"
        >
          <Box
            display={["none", , , "block"]}
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
            w={["full", , , navWidth === "stretched" ? "85%" : "94%"]}
            pos="relative"
            top="0"
            left={["0", , , navWidth === "stretched" ? "15%" : "6%"]}
            sx={customScrollBar2}
            overflow="auto"
            h="100vh"
            transition="400ms all ease-in-out"
            bg="#FAFAFA"
          >
            <Box>
              <Topbar onOpen={onOpen} />

              {children}
            </Box>
          </Box>
        </Box>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="app.primary.900">
          <DrawerCloseButton color="white" />
          {/* <DrawerHeader>Create your account</DrawerHeader> */}

          <DrawerBody>
            <SideNav
              stretch={stretch}
              shrink={shrink}
              navWidth={navWidth}
              onClose={onClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MainLayout;
