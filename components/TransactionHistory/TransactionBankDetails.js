import {
  Box,
  Flex,
  Grid,
  Img,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import TransactionDetails from "pages/transactions/transactionDetails";
import React, { useRef, useState } from "react";
import { AiFillPrinter, AiFillWarning, AiOutlineCopy } from "react-icons/ai";
import { RiSendPlaneFill } from "react-icons/ri";

const TransactionBankDetails = () => {
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
      <Box>
        <Stack mb="5">
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
        <Stack mb="5">
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
        <Stack mb="5">
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
        <Stack mb="5">
          <Text fontSize="12px">Transaction ID</Text>
          <InputGroup>
            <Input
              // disabled
              value="C74xPO3n4LiW"
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

      <Grid templateColumns="repeat(3, 1fr)" gap="4">
        <Box py="4" px="3" color="app.primary.300" bg="#51CBCD33">
          <Flex justify="center" x>
            <RiSendPlaneFill size="24px" />
          </Flex>

          <Text
            color="app.primary.500"
            mt="1"
            fontWeight={700}
            fontSize="13px"
            textAlign="center"
          >
            Send Money
          </Text>
        </Box>
        <Box py="4" px="3" color="app.primary.300" bg="#51CBCD33">
          <Flex justify="center" x>
            <AiFillWarning size="24px" />
          </Flex>

          <Text
            color="app.primary.500"
            mt="1"
            fontWeight={700}
            fontSize="13px"
            textAlign="center"
          >
            Report
          </Text>
        </Box>
        <Box py="4" px="3" color="app.primary.300" bg="#51CBCD33">
          <Flex justify="center" x>
            <AiFillPrinter size="24px" />
          </Flex>

          <Text
            color="app.primary.500"
            mt="1"
            fontWeight={700}
            fontSize="13px"
            textAlign="center"
          >
            Print
          </Text>
        </Box>
      </Grid>

      <Text color="app.primary.300" fontWeight={700} mt="4" textAlign="center">
        Share
      </Text>
    </Box>
  );
};

export default TransactionBankDetails;
