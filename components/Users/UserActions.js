import { Box, Button, Grid, useDisclosure, useToast } from "@chakra-ui/react";
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
import BVNResponse from "./BVNResponse";
import FreezeUser from "./FreezeUserModal";
import NewPin from "./NewPin";
import ResetUserPassword from "./ResetUserPassword";

const UserActions = ({ user_id, user }) => {
  const [confirmModalData, setConfirmModalData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bvnDetails, setBvnDetails] = useState(null);

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
  const {
    isOpen: isFreezeOpen,
    onOpen: onFreezeOpen,
    onClose: onFreezeClose,
  } = useDisclosure();
  const {
    isOpen: isBvnRespOpen,
    onOpen: onBvnRespOpen,
    onClose: onBvnRespClose,
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
  } = useLookupBvn(user?.bvn?.bvn);

  const handleBvnLookup = () => {
    if (!user?.bvn?.bvn) {
      errorToast("This user has not registered a BVN");
    } else lookupBvn();
  };

  useEffect(() => {
    if (!!bvnResp && bvnResp?.status === "success") {
      successToast("BVN is valid");
      onBvnRespOpen();
      setBvnDetails(bvnResp?.data);
      bvnReset();
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
        admin_reply: option === "activate" ? "verified" : "failed",
        verified: option === "activate" ? true : false,
      },
    };

    if (!user?.bvn?.bvn) {
      errorToast("This user has not registered a BVN");
    } else approveBvn(payload);
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
      closeModal();
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
        <Button onClick={onFreezeOpen} w="full">
          {user?.froozen ? "Unfreeze" : "Freeze"}
        </Button>
        <Button onClick={onOpen} w="full">
          Initiate Reset Pin
        </Button>
        <Button onClick={openResend} maxW="full" isLoading={resending}>
          Resend Activation Code
        </Button>

        {(user?.bvn?.verified == "false" || user?.bvn?.verified == false) && (
          <>
            <Button onClick={handleBvnLookup} maxW="full" isLoading={lookingUp}>
              Lookup Bvn Validity
            </Button>
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
        {isFreezeOpen && (
          <FreezeUser
            onClose={onFreezeClose}
            isOpen={isFreezeOpen}
            user={user}
          />
        )}
        {isBvnRespOpen && bvnDetails && (
          <BVNResponse
            onClose={onBvnRespClose}
            isOpen={isBvnRespOpen}
            BVNDetails={bvnDetails}
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
