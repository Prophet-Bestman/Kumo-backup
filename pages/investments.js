import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { useGetInvestments, useGetPackages } from "api/investment";
import { CustomTabList, FloatingAddBtn } from "components";
import { CreatePackage } from "components/Investments";
import InvestmentsTable from "components/Investments/InvestmentsTable";
import PackagesTable from "components/Investments/PackagesTable";
import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect, useState } from "react";
import { customScrollBar3 } from "utils/styles";

const tabs = [{ title: "Packages" }, { title: "Investments" }];

const Investments = () => {
  const [packages, setPackages] = useState([]);
  const [investments, setInvestments] = useState([]);
  const { setActiveNav } = useNavContext();
  useEffect(() => {
    setActiveNav(navStates.investments);
  }, [setActiveNav, navStates]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data: packagesResp, isLoading } = useGetPackages();
  const { data: investmentsResp } = useGetInvestments();

  useEffect(() => {
    if (!!packagesResp && packagesResp?.status === "success") {
      setPackages(packagesResp?.data);
    }
    if (!!investmentsResp && investmentsResp?.status === "success") {
      setInvestments(investmentsResp?.data);
    }
  }, [packagesResp, investmentsResp]);

  return (
    <Box p="6">
      {/* ========= ADD MENU ======= */}
      <Tabs>
        <CustomTabList tabList={tabs} />
        <TabPanels>
          <TabPanel>
            {<PackagesTable isLoading={isLoading} packages={packages} />}
          </TabPanel>
          <TabPanel>
            {
              <InvestmentsTable
                isLoading={isLoading}
                investments={investments}
              />
            }
          </TabPanel>
        </TabPanels>
      </Tabs>
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
      {isOpen && <CreatePackage isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
};

export default Investments;

Investments.requireAuth = true;
