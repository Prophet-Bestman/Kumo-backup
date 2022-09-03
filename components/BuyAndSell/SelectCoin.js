import React from "react";
import { Box, Flex, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaBtc, FaEthereum } from "react-icons/fa";
import { SiDash } from "react-icons/si";

import CustomTabList from "components/CustomTabList";

const SelectCoin = () => {
  const tabs = [
    {
      title: "BTC",
      icon: <FaBtc fontSize="18px" />,
    },
    {
      title: "ETH",
      icon: <FaEthereum fontSize="18px" />,
    },
    {
      title: "DASH",
      icon: <SiDash fontSize="18px" />,
    },
  ];
  return (
    <Box>
      <Text mb="3" fontWeight={700} fontSize="20px">
        Select Coin
      </Text>

      <Box>
        <Tabs
          borderWidth={0}
          rounded="md"
          py="3"
          variant="unstyled"
          defaultIndex={0}
        >
          <Box shadow="0px 13.8773px 48.5705px rgba(0, 0, 0, 0.05)">
            <CustomTabList size="sm" tabList={tabs} justify="center" />
          </Box>
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
        </Tabs>
      </Box>
    </Box>
  );
};

export default SelectCoin;
