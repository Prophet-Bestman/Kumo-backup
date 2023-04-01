import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Progress,
  Stack,
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
import {
  BasicTransactionDetails,
  TransactionRate,
} from "components/TransactionHistory";
import Link from "next/link";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  cryptoNumberWithCommas,
  flattenObject,
  handleRequestError,
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

  const { data: transactionResp, isLoading } =
    useGetSingleTransaction(transactionDetails);

  const {
    data: userResp,
    refetch: getUser,
    isLoading: loadingUser,
  } = useSingleGetUser(userId, {
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!!transactionResp && transactionResp?.status == "success") {
      const transaction = flattenObject(transactionResp?.data);
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
      {loadingUser || isLoading ? (
        <Progress isIndeterminate colorScheme="gray" />
      ) : (
        !!transactionResp?.data &&
        !!user && (
          <>
            <BasicTransactionDetails
              transaction={transactionResp?.data}
              user={user}
            />
            {!!transactionResp?.data?.rate && (
              <TransactionRate transactionRate={transactionResp?.data?.rate} />
            )}
          </>
          // <></>
        )
      )}
      {/* <Grid templateColumns={"repeat(1, 1fr)"} w={["100%", , , "75%"]} gap="4">
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
            <Grid templateColumns={"repeat(2, 1fr)"} gap="8">
              {!!transaction &&
                Object?.keys(transaction)?.map((prop, i) => (
                  <Stack display="flex" gap="2" my="2" key={i}>
                    <Text>
                      <strong strong> {underscoreToSpace(prop)}: </strong>
                    </Text>
                    {prop?.includes("description") ? (
                      <Textarea isReadOnly value={transaction[prop]}></Textarea>
                    ) : (
                      <Input
                        isReadOnly
                        value={
                          typeof transaction[prop] === "number"
                            ? cryptoNumberWithCommas(transaction[prop])
                            : transaction[prop]
                        }
                      />
                    )}
                  </Stack>
                ))}
            </Grid>
          </Box>

          <Button onClick={onOpen} mt="auto">
            Update Admin Description
          </Button>
        </GridItem>
      </Grid> */}

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
