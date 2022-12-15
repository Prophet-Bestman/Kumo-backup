import {
  Box,
  Button,
  Flex,
  Grid,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  useApproveBvn,
  useLookupBvn,
  useResendActivationCode,
  useUpdateUserStatus,
} from "api/users";
import ConfirmModal from "components/ConfirmModal";
import React, { useEffect, useState } from "react";
import { handleRequestError } from "utils/helpers";
import AdminText from "./AdminText";
import NewPin from "./NewPin";
import ResetUserPassword from "./ResetUserPassword";

const UserActions = ({ user_id, user }) => {
  const [confirmModalData, setConfirmModalData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // console.log(user);

  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const {
    isOpen: isPasswordOpen,
    onOpen: onPasswordOpen,
    onClose: onPasswordClose,
  } = useDisclosure();

  const {
    isOpen: isBlockOpen,
    onOpen: onBlockOpen,
    onClose: onBlockClose,
  } = useDisclosure();

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
  const errorToast = (msg) => {
    toast({
      title: "Action Failed",
      description: msg,
      status: "error",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  // ======= RESEND CODE ======
  const {
    mutate: updateStatus,
    isLoading: updating,
    data: updateResp,
    error: updateError,
    reset: updateReset,
  } = useUpdateUserStatus();

  // OPEN CONFIRM MODAL
  useEffect(() => {
    if (confirmModalData === null) {
    } else onConfirmOpen();
  }, [confirmModalData]);

  // CLOSE CONFIRM MODAL
  const closeModal = () => {
    setConfirmModalData(null);
    onConfirmClose();
  };

  const handleUpdate = (status) => {
    updateStatus({ _id: user_id, status });
  };

  const openActivate = () => {
    setConfirmModalData({
      msg: "Are you sure you want to activate this user?",
      btnText: "Yes, Activate",
      function: () => handleUpdate("active"),
    });
  };

  const openDeactivate = () => {
    setConfirmModalData({
      msg: "Are you sure you want to deactivate this user?",
      btnText: "Yes, Deactivate",
      function: () => handleUpdate("inActive"),
    });
  };

  useEffect(() => {
    if (updateResp && updateResp?.status === "success") {
      successToast("User account status updated");
      updateReset();
      closeModal();
    } else if (updateResp?.status === "failed") {
      errorToast(updateResp?.msg);
      updateReset();
      closeModal();
    }
  }, [updateResp]);

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

  const openResend = () => {
    setConfirmModalData({
      msg: "Are you sure you want to resend the activation code?",
      btnText: "Yes, Resend",
      function: () => handleResend(),
    });
  };

  useEffect(() => {
    if (resendResp && resendResp?.status === "success") {
      successToast("Check mail for code");
      resendReset();
      closeModal();
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

  const handleApprove = (option) => {
    const payload = {
      user_id,
      data: {
        admin_reply: option === "activate" ? "approved" : "disapproved",
        verified: option === "activate" ? true : "false",
      },
    };
    approveBvn(payload);
  };

  const openActivateKyc = (option) => {
    setConfirmModalData({
      msg:
        option === "activate"
          ? "Are you sure you want to activate this user's KYC"
          : "Are you sure you want to decline this user's KYC",
      btnText: option === "activate" ? "Yes, Activate" : "Yes, Decline",
      function: () => handleApprove(option),
    });
  };

  useEffect(() => {
    if (!!approveResp && approveResp?.status === "success") {
      successToast(approveResp?.msg);
    }
    approveReset();
  }, [approveResp]);

  useEffect(() => {
    handleRequestError(resendError);
    resendReset();
    handleRequestError(bvnError);
    bvnReset();
    handleRequestError(approveError);
    approveReset();
    handleRequestError(updateError);
    updateReset();
  }, [resendError, bvnError, approveError, updateError]);

  return (
    <Box px="10" py="14" bg="white" boxShadow="sm">
      <Grid
        templateColumns={"repeat(3, 1fr)"}
        gap="4"
        my="10"
        justify={"center"}
      >
        {user?.status !== "active" && (
          <Button onClick={openActivate} w="full">
            Acivate
          </Button>
        )}
        {user?.status !== "inActive" && (
          <Button onClick={openDeactivate} w="full">
            Deactivate
          </Button>
        )}
        {user?.status !== "suspended" && (
          <Button onClick={onBlockOpen} w="full">
            Block
          </Button>
        )}
        <Button onClick={onPasswordOpen} w="full">
          Reset Password
        </Button>
        <Button onClick={onOpen} w="full">
          Initiate Reset Pin
        </Button>
        <Button onClick={openResend} maxW="full" isLoading={resending}>
          Resend Activation Code
        </Button>
        <Button onClick={lookupBvn} maxW="full" isLoading={lookingUp}>
          Lookup Bvn Validity
        </Button>

        {user?.bvn?.admin_reply === "" && (
          <>
            <Button
              onClick={() => openActivateKyc("activate")}
              maxW="full"
              isLoading={approving}
            >
              Activate KYC/Verify BVN
            </Button>
            <Button
              onClick={() => openActivateKyc("decline")}
              maxW="full"
              isLoading={approving}
            >
              Decline KYC/BVN Verification
            </Button>
          </>
        )}
        {isOpen && (
          <NewPin onClose={onClose} isOpen={isOpen} user_id={user_id} />
        )}

        {isPasswordOpen && (
          <ResetUserPassword
            onClose={onPasswordClose}
            isOpen={isPasswordOpen}
            user_id={user_id}
          />
        )}
        <AdminText
          onClose={onBlockClose}
          isOpen={isBlockOpen}
          user_id={user_id}
        />

        <ConfirmModal
          message={confirmModalData?.msg}
          primaryFunc={{
            name: confirmModalData?.btnText,
            func: confirmModalData?.function,
          }}
          isOpen={isConfirmOpen}
          onClose={closeModal}
          isLoading={updating || resending || approving}
        />
      </Grid>
    </Box>
  );
};

export default UserActions;
