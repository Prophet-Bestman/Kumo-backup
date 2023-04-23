import React from "react";
import { Box, Flex, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";

import { TbCurrencyNaira } from "react-icons/tb";
import { FaBtc, FaEthereum } from "react-icons/fa";
import { SiDash } from "react-icons/si";
import CustomTabList from "components/CustomTabList";

const WalletBalance = () => {
  const tabs = [
    {
      title: "NGN",
      icon: <TbCurrencyNaira fontSize="26px" />,
    },
    {
      title: "BTC",
      icon: <FaBtc fontSize="26px" />,
    },
    {
      title: "ETH",
      icon: <FaEthereum fontSize="26px" />,
    },
    {
      title: "DASH",
      icon: <SiDash fontSize="26px" />,
    },
  ];
  return (
    <Box overflowX="auto">
      <Tabs
        borderWidth={0}
        rounded="md"
        py="3"
        variant="unstyled"
        overflowX="auto"
        defaultIndex={0}
      >
        <TabPanels h="150px">
          <TabPanel>
            <Box mb="18">
              <Text fontSize="13px" textAlign="center" mb="4">
                Total Balance
              </Text>

              <Flex
                color="app.primary.900"
                justify="center"
                fontWeight={700}
                alignItems="center"
                gap={3}
              >
                <Text fontSize="16px">NGN</Text>
                <Text fontSize="56px">78,000</Text>
                <Text fontSize="16px">.00</Text>
              </Flex>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box mb="18">
              <Text fontSize="13px" textAlign="center" mb="4">
                Total Balance
              </Text>

              <Flex
                color="app.primary.900"
                justify="center"
                fontWeight={700}
                alignItems="center"
                gap={3}
              >
                <Text fontSize="16px">
                  <FaBtc fontSize="32px" />
                </Text>
                <Text fontSize="56px">9</Text>
                <Text fontSize="16px">.18</Text>
              </Flex>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box mb="18">
              <Text fontSize="13px" textAlign="center" mb="4">
                Total Balance
              </Text>

              <Flex
                color="app.primary.900"
                justify="center"
                fontWeight={700}
                alignItems="center"
                gap={3}
              >
                <Text fontSize="16px">
                  <FaEthereum fontSize={"32px"} />
                </Text>
                <Text fontSize="56px">12</Text>
                <Text fontSize="16px">.08</Text>
              </Flex>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box mb="18">
              <Text fontSize="13px" textAlign="center" mb="4">
                Total Balance
              </Text>

              <Flex
                color="app.primary.900"
                justify="center"
                fontWeight={700}
                alignItems="center"
                gap={3}
              >
                <Text fontSize="16px">
                  <SiDash fontSize="32px" />
                </Text>
                <Text fontSize="56px">70</Text>
                <Text fontSize="16px">.42</Text>
              </Flex>
            </Box>
          </TabPanel>
        </TabPanels>

        <Box maxW={["380px", "500px", "600px"]} overflowX={"auto"}>
          <CustomTabList
            tabwWidth={["100px"]}
            tabList={tabs}
            justify="space-evenly"
            size={["sm"]}
          />
        </Box>
      </Tabs>
    </Box>
  );
};

export default WalletBalance;
