import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetSingleTransaction,
  useUpdateTransaction,
} from "api/transactions";
import { useSingleGetUser } from "api/users";
import { InputError, LargeHeading, ModalCard } from "components";
import Link from "next/link";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import {
  cryptoNumberWithCommas,
  flattenObject,
  getStatusColor,
  handleRequestError,
  numberWithCommas,
  underscoreToSpace,
} from "utils/helpers";
import { updateTransactionSchema } from "utils/schema";

const TransactionDetails = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [transaction, setTransaction] = useState(null);

  const { transactionDetails } = router.query;

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data: transactionResp } = useGetSingleTransaction(transactionDetails);

  const { data: userResp, refetch: getUser } = useSingleGetUser(userId, {
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!!transactionResp && transactionResp?.status == "success") {
      const transaction = flattenObject(transactionResp?.data);
      console.log(transaction);
      setTransaction(transaction);
      setUserId(transactionResp?.data?.user_id);
    }
  }, [transactionResp]);

  const { mutate: updateTransaction, isLoading: updating } =
    useUpdateTransaction();

  const handleTranactionUpdate = (status) => {
    const payload = {
      _id: transactionDetails,
      data: {
        status,
      },
    };
    updateTransaction(payload);
  };

  useEffect(() => {
    if (!!userId) getUser();
  }, [userId, getUser]);

  useEffect(() => {
    if (!!userResp && userResp?.data) {
      setUser(userResp?.data);
    }
  }, [userResp, setUser]);

  return (
    <Box p="6" px="10">
      <Grid templateColumns={"repeat(1, 1fr)"} w={["100%", , , "75%"]} gap="4">
        <GridItem bg="white" px="8">
          <Box my="12" textTransform="capitalize">
            <Link href={`/users/${userId}`}>
              <Flex gap="2" fontSize="20px" my="2" cursor="pointer">
                <strong>User: </strong>
                <Text textDecor="underline" color="app.primary.700">
                  {user?.first_name} {user?.last_name}
                </Text>
              </Flex>
            </Link>

            {!!transaction &&
              Object?.keys(transaction)?.map((prop, i) => (
                <Text display="flex" gap="2" my="2" key={i}>
                  {typeof transaction[prop] !== "object" && (
                    <>
                      <strong strong> {underscoreToSpace(prop)}: </strong>

                      {prop === "from"
                        ? transaction?.type?.includes("BUY")
                          ? "KUMO"
                          : transaction[prop]
                        : prop === "to" && transaction?.type?.includes("SELL")
                        ? "KUMO"
                        : transaction[prop]}
                    </>
                  )}
                </Text>
              ))}
          </Box>

          {/* <Box my="12" textTransform="capitalize">
            <Link href={`/users/${userId}`}>
              <Flex gap="2" fontSize="20px" my="2" cursor="pointer">
                <strong>User: </strong>
                <Text textDecor="underline" color="app.primary.700">
                  {user?.first_name} {user?.last_name}
                </Text>
              </Flex>
            </Link>
            <Text my="2">
              <strong>Type: </strong> {transaction?.type}
            </Text>
            <Text fontSize="" my="2">
              <strong>Amount Paid (N): </strong> N{" "}
              {numberWithCommas(transaction?.amount_paid_in_naira)}
            </Text>
            <Text fontSize="" my="2">
              <strong>Amount to fund: </strong>{" "}
              {numberWithCommas(transaction?.amount_to_fund_in_coin)}
            </Text>
            <Text fontSize="" my="2" textTransform="capitalize">
              <strong>currency: </strong> {transaction?.currency}
            </Text>
            <Link href={`/users/${userId}`}>
              <Flex gap="2" fontSize="" my="2" cursor="pointer">
                <strong>From: </strong>
                <Text textDecor="underline" color="app.primary.700">
                  {transaction?.type?.includes("BUY")
                    ? "KUMO"
                    : transaction?.from}
                </Text>
              </Flex>
            </Link>

            <Text fontSize="" my="2">
              <strong>to: </strong>{" "}
              {transaction?.type?.includes("SELL") ? "KUMO" : transaction?.to}
            </Text>
            <Text fontSize="" my="2">
              <strong>Dollar to coin rate: </strong>{" "}
              {cryptoNumberWithCommas(transaction?.rate_per_dollar_to_currency)}
            </Text>
            <Text fontSize="" my="2">
              <strong>Naira to dollar rate: </strong>{" "}
              {cryptoNumberWithCommas(transaction?.rate_per_naira_to_dollar)}
            </Text>
            <Text fontSize="" my="2">
              <strong>Fee: </strong> {cryptoNumberWithCommas(transaction?.fee)}
            </Text>
            <Text fontSize="" my="2">
              <strong>Mode: </strong> {transaction?.mode}
            </Text>
            <Flex fontSize="" my="2" gap="1">
              <strong>Status: </strong>
              <Text color={getStatusColor(transaction?.status)}>
                {transaction?.status}
              </Text>

              <Menu>
                <MenuButton
                  as={Button}
                  variant="unstyled"
                  w="full"
                  h="fit-content"
                  ml="auto"
                  rightIcon={
                    updating ? (
                      <Spinner ml="auto" size="sm" />
                    ) : (
                      <AiFillEdit cursor="pointer" size="18px" />
                    )
                  }
                ></MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      handleTranactionUpdate(
                        "fulfilled",
                        transaction?.admin_description
                      )
                    }
                  >
                    Approve
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleTranactionUpdate(
                        "failed",
                        transaction?.admin_description
                      )
                    }
                  >
                    Decline
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            
            <Box
              my="2"
              color="app.primary.500"
              fontStyle="italic"
              // fontSize="20px"
            >
              {transaction?.isComplete && (
                <Text mb="5">Transaction Completed</Text>
              )}

              <Text>Fri Aug 07, 2020</Text>
            </Box>
          </Box> */}
        </GridItem>

        <GridItem px="6" py="12" rounded="md" bg="white">
          {/* <TransactionBankDetails /> */}

          <Flex flexDir="column" h="full">
            <Box mb="6">
              <Text fontSize={"xl"} fontWeight="700">
                Description
              </Text>
              <Text fontSize="14px">{transaction?.description}</Text>
            </Box>
            <Text fontSize={"xl"} fontWeight="700">
              Admin Description
            </Text>
            <Text fontSize="14px">{transaction?.admin_description}</Text>

            <Button onClick={onOpen} mt="auto">
              Update Admin Description
            </Button>
          </Flex>
        </GridItem>
      </Grid>

      {isOpen && (
        <AdminDescriptionUpdate
          isOpen={isOpen}
          onClose={onClose}
          transaction={transaction}
        />
      )}
    </Box>
  );
};

export default TransactionDetails;

TransactionDetails.requireAuth = true;

const AdminDescriptionUpdate = ({ isOpen, onClose, transaction }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateTransactionSchema),
    defaultValues: { admin_description: transaction?.admin_description },
  });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Succesfully Updated Transaction",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    mutate: updateTransaction,
    data: updateResp,
    isLoading: updating,
    error: updateError,
    reset,
  } = useUpdateTransaction();

  const handleUpdateAdminDesc = (data) => {
    const payload = {
      _id: transaction?._id,
      data: {
        status: transaction?.status,
        admin_description: data?.admin_description,
      },
    };
    updateTransaction(payload);
  };

  useEffect(() => {
    if (!!updateResp && updateResp?.status === "success") {
      successToast();
      onClose();
    }
  }, [updateResp]);

  useEffect(() => {
    handleRequestError(updateError);
    reset();
  }, [updateError, reset]);

  return (
    <ModalCard isOpen={isOpen} onClose={onClose}>
      <Box px="2" py="6">
        <LargeHeading>Update Admin Description</LargeHeading>

        <Textarea
          my="4"
          {...register("admin_description")}
          minH="130px"
          _focus={{ borderColor: "app.primary.900" }}
        ></Textarea>
        <InputError msg={errors?.admin_description?.message} />

        <Flex>
          <Button
            ml="auto"
            size="sm"
            onClick={handleSubmit(handleUpdateAdminDesc)}
            isLoading={updating}
          >
            Update
          </Button>
        </Flex>
      </Box>
    </ModalCard>
  );
};
