import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDeleteUser, useFreezeUser, useUnfreezeUser } from "api/users";
import ConfirmModal from "components/ConfirmModal";
import React, { useEffect, useRef } from "react";
import { handleRequestError } from "utils/helpers";

const FreezeUser = ({ user, onClose, isOpen }) => {
  const { email, _id } = user;

  const router = useRouter();

  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    onOpen: onDeleteOpen,
  } = useDisclosure();

  const toast = useToast();

  const successToast = (msg) => {
    toast({
      title: "Successful",
      description: msg,
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const userIdRef = useRef(null);
  const referralIdRef = useRef(null);

  function copyUserId() {
    userIdRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    successToast();
  }

  function copyReferralId(_id) {
    referralIdRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    successToast();
  }

  const {
    mutate: deleteUser,
    data: deleteResp,
    error: deleteError,
    isLoading: deleting,
    reset: resetDelete,
  } = useDeleteUser();

  const {
    mutate: freezeUser,
    data: freezeResp,
    error: freezeError,
    isLoading: freezing,
    reset: resetFreeze,
  } = useFreezeUser();
  const {
    mutate: unfreezeUser,
    data: unfreezeResp,
    error: unfreezeError,
    isLoading: unfreezing,
    reset: resetUnreeze,
  } = useUnfreezeUser();

  const handleDelete = () => {
    deleteUser(_id);
  };

  const handleFreeze = () => {
    const payload = {
      data: {
        user_id: _id,
        account_email: email,
      },
    };
    user?.froozen ? unfreezeUser(payload) : freezeUser(payload);
  };

  useEffect(() => {
    if (!!deleteResp && deleteResp?.status === "success") {
      successToast("Succesfully Deleted User");
      resetDelete();
      router.push("/users");
    }
  }, [deleteResp]);

  useEffect(() => {
    if (!!freezeResp && freezeResp?.status === "success") {
      successToast("Succesfully Frozen User");
      resetFreeze();
      onClose();
    }
    if (!!unfreezeResp && unfreezeResp?.status === "success") {
      successToast("Succesfully Unfrozen User");
      resetUnreeze();
      onClose();
    }
  }, [freezeResp, unfreezeResp]);

  useEffect(() => {
    handleRequestError(deleteError);
    resetDelete();
  }, [deleteError]);

  useEffect(() => {
    handleRequestError(freezeError);
    resetFreeze();
  }, [freezeError]);

  useEffect(() => {
    handleRequestError(unfreezeError);
    resetUnreeze();
  }, [unfreezeError]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent height="300px">
        <ModalBody px="6" py="12">
          <Box my="auto">
            <Text
              fontSize="18px"
              fontWeight="700"
              w="70%"
              mx="auto"
              mb="8"
              textAlign="center"
            >
              Are you sure you want to {user?.froozen ? "Unfreeze " : "Freeze"}{" "}
              this user
            </Text>
            <Flex rounded="md" alignItems="center">
              <Button variant="link" onClick={onClose}>
                No, Cancel
              </Button>

              <Button onClick={handleFreeze} isLoading={freezing || unfreezing}>
                Yes
              </Button>
              <ConfirmModal
                isOpen={isDeleteOpen}
                onClose={onDeleteClose}
                primaryFunc={{ name: "Delete User", func: handleDelete }}
                message={"Are you sure you want to delete this user"}
                isLoading={deleting}
              />
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FreezeUser;
