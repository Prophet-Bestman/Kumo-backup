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

const BankTransfer = ({ completeTransaction }) => {
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
        Bank Transfer
      </Text>
      <Text fontSize="11px" mb="9" w="85%">
        Kindly note that this option is manual and your wallet will be credited
        when value is received from your bank, Crediting your wallet might take
        up to 5 minutes - 2 hours depending on bank network. Kindly exercise
        patience while the process is ongoing
      </Text>

      <Box>
        <Stack>
          <Text fontSize="12px">Bank Name</Text>
          <InputGroup>
            <Input
              // disabled
              value="Zenith Bank"
              fontWeight={700}
              color="app.primary.900"
            />
            <InputRightElement>
              <Img src="/img/zenith.png" />
            </InputRightElement>
          </InputGroup>
        </Stack>
        <Stack>
          <Text fontSize="12px">Account Name</Text>
          <InputGroup>
            <Input
              // disabled
              value="kurefunds consult Ltd"
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
        <Stack>
          <Text fontSize="12px">Account Number</Text>
          <InputGroup>
            <Input
              // disabled
              value="8261543291"
              fontWeight={700}
              color="app.primary.900"
              ref={acctNumberRef}
            />
            <InputRightElement>
              <Flex
                gap="1"
                alignItems="center"
                color="app.primary.300"
                mr="20px"
                cursor="pointer"
                onClick={copyAcctNumber}
              >
                <AiOutlineCopy size="20px" /> Copy
              </Flex>
            </InputRightElement>
          </InputGroup>
        </Stack>
        <Stack>
          <Text fontSize="12px">Transfer via USSD</Text>
          <InputGroup>
            <Input
              // disabled
              value="*901*10000*8261543291#"
              fontWeight={700}
              color="app.primary.900"
              ref={ussdRef}
            />
            <InputRightElement>
              <Flex
                gap="1"
                alignItems="center"
                color="app.primary.300"
                mr="20px"
                cursor="pointer"
                onClick={copyUssd}
              >
                <AiOutlineCopy size="20px" /> Copy
              </Flex>
            </InputRightElement>
          </InputGroup>
        </Stack>
      </Box>

      <Text my="4" fontSize="14px">
        *After transferring funds, send an SMS to <strong>08103750822</strong>{" "}
        or WhatsApp <strong>07086337628</strong> with just the amount sent and
        the KurePay email address to be credited
      </Text>

      <Text color="app.primary.300" fontWeight={700} mt="4" textAlign="center">
        Share
      </Text>
    </Box>
  );
};

export default BankTransfer;
