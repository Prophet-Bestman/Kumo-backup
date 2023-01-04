import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  GridItem,
  Input,
  Stack,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDeletePackage, useUpdatePackage } from "api/investment";
import { ModalCard, LargeHeading, InputError, ConfirmModal } from "components";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { updatePackageSchema } from "utils/schema";
import { customScrollBar3 } from "utils/styles";
import AddToken from "./AddToken";
import TokenTag from "./TokenTag";

const UpdatePackage = ({ isOpen, onClose, singlePackage }) => {
  const [status, setStatus] = useState(singlePackage?.status);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updatePackageSchema),
    defaultValues: { ...singlePackage },
  });

  const handleChangeStatus = () => {
    if (status === "active") {
      setStatus("inactive");
    } else setStatus("active");
  };

  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    onOpen: onDeleteOpen,
  } = useDisclosure();
  const {
    isOpen: isTokenOpen,
    onClose: onTokenClose,
    onOpen: onTokenOpen,
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

  const {
    mutate: updatePackage,
    data: updateResp,
    error: updateError,
    isLoading,
    reset,
  } = useUpdatePackage();

  const {
    mutate: deletePackage,
    data: deleteResp,
    error: deleteError,
    isLoading: deleting,
    reset: resetDelete,
  } = useDeletePackage();

  const handleUpdatePackage = (data) => {
    const payload = {
      id: singlePackage?._id,
      data: {
        ...data,
        status,
      },
    };
    updatePackage(payload);
  };

  const handleDelete = () => {
    deletePackage(singlePackage?._id);
  };

  useEffect(() => {
    if (!!updateResp && updateResp?.status === "success") {
      successToast("Succesfully Updated Package");
      reset();
      onClose();
    }
  }, [updateResp]);

  useEffect(() => {
    if (!!deleteResp && deleteResp?.status === "success") {
      successToast("Succesfully Deleted Package");
      resetDelete();
      onClose();
    }
  }, [deleteResp]);

  useEffect(() => {
    handleRequestError(updateError);
    reset();
  }, [updateError]);

  useEffect(() => {
    handleRequestError(deleteError);
    resetDelete();
  }, [deleteError]);

  return (
    <ModalCard isOpen={isOpen} onClose={onClose} size="4xl">
      <LargeHeading my="4">Update Package</LargeHeading>
      <Grid
        templateColumns="repeat(2, 1fr)"
        px="4"
        py="8"
        overflowY="auto"
        sx={customScrollBar3}
        gap="7"
      >
        <GridItem>
          <Box>
            <form onSubmit={handleSubmit(handleUpdatePackage)}>
              <Grid rowGap="4">
                <Stack>
                  <Text fontSize="12px">Name</Text>
                  <Input {...register("package_name")} />
                  <InputError msg={errors?.package_name?.message} />
                </Stack>

                <Grid templateColumns={"repeat(3, 1fr)"} gap="2" my="4">
                  <Stack>
                    <Text fontSize="12px">Package Apr</Text>
                    <Input {...register("package_apr")} />
                    <InputError msg={errors?.package_apr?.message} />
                  </Stack>

                  <Stack>
                    <Text fontSize="12px">Min Amount</Text>
                    <Input {...register("min_amount")} type="number" />
                    <InputError msg={errors?.min_amount?.message} />
                  </Stack>
                  <Stack>
                    <Text fontSize="12px">Max Amount</Text>
                    <Input {...register("max_amount")} type="number" />
                    <InputError msg={errors?.max_amount?.message} />
                  </Stack>
                </Grid>

                <Grid templateColumns={"repeat(3, 1fr)"} gap="2">
                  <Stack>
                    <Text fontSize="12px">Is Fixed?</Text>
                    <Switch {...register("isFixed")} />
                    <InputError msg={errors?.isFixed?.message} />
                  </Stack>
                  <Stack>
                    <Text fontSize="12px">Status</Text>
                    <Switch
                      value={status}
                      isChecked={status === "active"}
                      onChange={handleChangeStatus}
                    />
                    <InputError msg={errors?.status?.message} />
                  </Stack>
                </Grid>
              </Grid>

              <Button type="submit" my="6" isLoading={isLoading}>
                Update
              </Button>

              <Flex>
                <Button
                  color="red"
                  variant="link"
                  isLoading={deleting}
                  onClick={onDeleteOpen}
                >
                  Delete
                </Button>
              </Flex>
            </form>
          </Box>
        </GridItem>

        <GridItem>
          <Stack mb="5">
            <Text fontSize="12px">Info</Text>
            <Textarea {...register("info")} />
            <InputError msg={errors?.info?.message} />
          </Stack>

          <Text fontWeight={700} mb="3">
            Package Tokens
          </Text>

          {/* TOKENS */}
          <Flex gap="2" wrap="wrap">
            {singlePackage?.package_token?.map((token, i) => (
              <TokenTag token={token} key={i} id={singlePackage?._id} />
            ))}
          </Flex>
          <Flex>
            <Box ml="auto" mt="1">
              <Circle
                transition="ease-in-out 400ms all"
                cursor="pointer"
                _hover={{ transform: "scale(110%)" }}
                bg="app.primary.900"
                color="white"
                shadow="md"
                fontWeight={500}
                fontSize="24"
                size="40px"
                onClick={onTokenOpen}
              >
                +
              </Circle>
            </Box>
          </Flex>
        </GridItem>
      </Grid>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        primaryFunc={{ name: "Delete package", func: handleDelete }}
        message={"Are you sure you want to delete this package"}
        isLoading={deleting}
      />

      <AddToken
        isOpen={isTokenOpen}
        onClose={onTokenClose}
        package_id={singlePackage?._id}
      />
    </ModalCard>
  );
};

export default UpdatePackage;
