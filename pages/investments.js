import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { FloatingAddBtn } from "components";
import { CreatePackage } from "components/Investments";
import React from "react";
import { customScrollBar3 } from "utils/styles";

const Investments = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box p="6">
      {/* ========= ADD MENU ======= */}
      <Box pos="fixed" bottom={8} right={8}>
        <Menu>
          <MenuButton variant="unstyled" as={Button}>
            <FloatingAddBtn />
          </MenuButton>

          <MenuList
            pos="relative"
            zIndex="docked"
            maxH="200px"
            overflowY="auto"
            sx={customScrollBar3}
            fontWeight={500}
            fontSize="14px"
          >
            <MenuItem onClick={onOpen}>Create Investment Package</MenuItem>
            {/* <MenuItem onClick={onWalletFeeOpen}>Add Fund Wallet Fee</MenuItem> */}
            {/* <MenuItem onClick={onAddCryptoOpen}>
              Add Crypto Wallet Address
            </MenuItem> */}
          </MenuList>
        </Menu>
      </Box>
      <CreatePackage isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Investments;

Investments.requireAuth = true;
