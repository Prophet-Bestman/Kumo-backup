import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { FaBtc, FaEthereum } from "react-icons/fa";
import { SiDash } from "react-icons/si";

import CustomTabList from "components/CustomTabList";

const SelectCoin = ({ setShowConfirm }) => {
  const [cryptoStep, setCryptoStep] = useState(1);
  const [address, setAddress] = useState("");
  const [edit, setEdit] = useState(true);

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

  const pasteAddress = async () => {
    let text = await navigator.clipboard.readText();
    setAddress(text);
  };

  const proceed = () => {
    setEdit(false);
    setShowConfirm(true);
  };

  return (
    <Box bg="white" px="6" py="9" rounded="md">
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
            <CustomTabList
              size="sm"
              tabList={tabs}
              tabWidth="full"
              justify="space-between"
            />
          </Box>
          <TabPanels>
            <TabPanel>
              {cryptoStep === 1 && (
                <Box mb="4">
                  <Flex
                    mt="16"
                    justify="center"
                    fontWeight={700}
                    alignItems="center"
                    gap="1"
                  >
                    <Text fontSize="16px">NGN</Text>
                    <Text fontSize="16px">78,000.00</Text>
                  </Flex>

                  <Text
                    mt="12"
                    textAlign="center"
                    fontSize="12px"
                    color="app.primary.900"
                  >
                    Your Bal: 0984873 BTC
                  </Text>

                  <Button mt="4" bg="#F2F2F2" color="black">
                    0.000875 BTC
                  </Button>

                  <Text my="4" fontSize="12px">
                    * 1BTC = NGN 4783076
                  </Text>

                  <Button
                    mt="6"
                    variant="link"
                    onClick={() => setCryptoStep(2)}
                  >
                    Confirm
                  </Button>
                </Box>
              )}

              {cryptoStep === 2 && (
                <Box my="4">
                  {!edit ? (
                    <Text textAlign="center">{address}</Text>
                  ) : (
                    <Input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  )}

                  {!edit ? (
                    <Button
                      mt="12"
                      variant="link"
                      onClick={() => setEdit(true)}
                    >
                      Edit
                    </Button>
                  ) : address?.length < 20 ? (
                    <Button mt="12" variant="link" onClick={pasteAddress}>
                      Paste
                    </Button>
                  ) : (
                    <Button mt="12" variant="link" onClick={proceed}>
                      Proceed
                    </Button>
                  )}
                </Box>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default SelectCoin;
