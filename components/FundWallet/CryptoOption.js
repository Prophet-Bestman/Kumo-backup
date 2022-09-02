import React from "react";
import { Box, Flex, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";

import { TbCurrencyNaira } from "react-icons/tb";
import { FaBtc, FaEthereum } from "react-icons/fa";
import { SiDash } from "react-icons/si";
import CustomTabList from "components/CustomTabList";
import { AiOutlineCopy } from "react-icons/ai";

const CryptoOption = () => {
  const tabs = [
    {
      title: "BTC",
      icon: <FaBtc color="#F9AA4B" fontSize="18px" />,
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
        Crypto Address
      </Text>
      <Text fontSize="12px" mb="9" w="85%">
        Copy/Scan this Address and Barcode to add to your Kurewallet
      </Text>
      <Tabs
        borderWidth={0}
        rounded="md"
        py="3"
        variant="unstyled"
        defaultIndex={0}
      >
        <Box shadow="0px 13.8773px 48.5705px rgba(0, 0, 0, 0.05)">
          <CustomTabList
            size="sm"
            tabList={tabs}
            justify="center"
            tabWidth="full"
          />
        </Box>
        <TabPanels h="150px">
          <TabPanel>
            <Box mb="18">
              <Text fontSize="13px" textAlign="center" mb="4">
                * 1BTC = NGN 4783076
              </Text>

              <Flex
                color="app.primary.900"
                justify="space-between"
                fontWeight={700}
                alignItems="center"
                gap={3}
              >
                <Text fontSize="24px" fontWeight={700} w="60%">
                  3EmTYjUdn5aP6GPMcG6djmXJJ7qPZB6NmF
                </Text>
                <Flex color="app.primary.300" gap="2">
                  <AiOutlineCopy size={"20px"} />
                  <Text fontSize="14px">Copy</Text>
                </Flex>
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
  );
};

export default CryptoOption;
