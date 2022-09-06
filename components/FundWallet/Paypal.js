import {
  Box,
  Flex,
  Img,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";

const PaypalOption = ({ completeTransaction }) => {
  const [step, setStep] = useState(1);

  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Copied",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const ussdRef = useRef(null);
  const acctNameRef = useRef(null);
  const acctNumberRef = useRef(null);

  function copyToAcctName(e) {
    acctNameRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    successToast();
  }

  function copyAcctNumber(e) {
    acctNumberRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    successToast();
  }

  function copyUssd(e) {
    ussdRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    successToast();
  }

  return (
    <Box bg="white" px="6" py="9" rounded="md">
      <Text mb="3" fontWeight={700} fontSize="20px">
        PayPal
      </Text>
      <Text fontSize="12px" mb="9" w="85%">
        Fund your wallet via paypal
      </Text>

      <Box>
        <Stack>
          <Text fontSize="12px">Account Username</Text>
          <InputGroup>
            <Input
              // disabled
              value="vivas4eva@gmail.com"
              fontWeight={700}
              color="app.primary.900"
              ref={acctNameRef}
            />
            <InputRightElement>
              <Flex
                gap="1"
                alignItems="center"
                color="app.primary.300"
                mr="20px"
                cursor="pointer"
                onClick={copyToAcctName}
              >
                <AiOutlineCopy size="20px" /> Copy
              </Flex>
            </InputRightElement>
          </InputGroup>
        </Stack>
      </Box>

      <Text my="8" fontSize="14px">
        * Current exchange rate @ 320 - 360
      </Text>
      <Text my="8" fontSize="14px">
        *After transferring funds, send an SMS to <strong>08103750822</strong>{" "}
        or WhatsApp <strong>07086337628</strong> with just the amount sent and
        the KurePay email address to be credited
      </Text>
      <Text my="8" fontSize="14px">
        Kindly note: This process is not automated (crediting is not instant)
        you will be credited when funds are received and at the current exchange
        rate. Funding might take between 24 - 48 hours pending when funds are
        released from PayPal
      </Text>

      <Text color="app.primary.300" fontWeight={700} mt="4" textAlign="center">
        Share
      </Text>
    </Box>
  );
};

export default PaypalOption;
