import { Box, Button, Flex, useDisclosure, useToast } from "@chakra-ui/react";
import {
  useApproveBvn,
  useLookupBvn,
  useResendActivationCode,
  useResetUsersPin,
} from "api/users";
import React, { useEffect } from "react";
import { handleRequestError } from "utils/helpers";
import NewPin from "./NewPin";

const UserActions = ({ user_id, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = (msg) => {
    toast({
      title: "Action Successful",
      description: msg,
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  // ======= RESEND CODE ======
  const {
    mutate: resendCode,
    isLoading: resending,
    data: resendResp,
    error: resendError,
    reset: resendReset,
  } = useResendActivationCode();
  const handleResend = () => {
    resendCode({ _id: user_id });
  };

  useEffect(() => {
    if (resendResp && resendResp?.status === "success") {
      successToast("Check mail for code");
      resendReset();
    }
  }, [resendResp]);

  //  ======== LOOK UP BVN ========
  const {
    data: bvnResp,
    refetch: lookupBvn,
    isLoading: lookingUp,
    error: bvnError,
    remove: bvnReset,
  } = useLookupBvn(user?.bvn?.bvn_number);

  useEffect(() => {
    if (!!bvnResp && bvnResp?.status === "success") {
      successToast("BVN is valid");
    }
  }, [bvnResp]);

  //  ======== APPROVE BVN ========
  const {
    data: approveResp,
    mutate: approveBvn,
    isLoading: approving,
    error: approveError,
    reset: approveReset,
  } = useApproveBvn();

  const handleApprove = () => {
    approveBvn(user_id);
  };

  useEffect(() => {
    if (!!approveResp && approveResp?.status === "success") {
      successToast("KYC Successfully Activated");
    }
  }, [approveResp]);

  useEffect(() => {
    handleRequestError(resendError);
    resendReset();
    handleRequestError(bvnError);
    bvnReset();
    handleRequestError(approveError);
    approveReset();
  }, [resendError, bvnError, approveError]);

  return (
    <Flex gap="4" my="10" justify={"center"}>
      <Button onClick={onOpen} w="fit-content">
        Reset Pin
      </Button>
      <Button onClick={handleResend} maxW="fit-content" isLoading={resending}>
        Resend Activation Code
      </Button>
      <Button onClick={lookupBvn} maxW="fit-content" isLoading={lookingUp}>
        Lookup Bvn Validity
      </Button>
      <Button onClick={handleApprove} maxW="fit-content" isLoading={approving}>
        Activate KYC
      </Button>

      <NewPin onClose={onClose} isOpen={isOpen} user_id={user_id} />
    </Flex>
  );
};

export default UserActions;
