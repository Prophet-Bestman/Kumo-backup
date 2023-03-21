import {
  Box,
  Button,
  Grid,
  Input,
  Select,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDeleteAgent, useUpdateAgent } from "api/agents";
import { ModalCard, LargeHeading, InputError, ConfirmModal } from "components";
import countries from "data/coutriesAndCode";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { createAgentSchema } from "utils/schema";
import { customScrollBar3 } from "utils/styles";

const UpdateAgent = ({ isOpen, onClose, agent }) => {
  console.log(agent);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createAgentSchema),
    defaultValues: { ...agent, ...agent?.type_details },
  });

  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    onOpen: onDeleteOpen,
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
    mutate: updateAgent,
    data: updateResp,
    error: updateError,
    isLoading,
    reset,
  } = useUpdateAgent();

  const {
    mutate: deleteAgent,
    data: deleteResp,
    error: deleteError,
    isLoading: deleting,
    reset: resetDelete,
  } = useDeleteAgent();

  const handleUpdateAgent = (data) => {
    const payload = {
      _id: agent?._id,
      data: data,
    };
    updateAgent(payload);
  };

  const handleDelete = () => {
    deleteAgent(agent?._id);
  };

  useEffect(() => {
    if (!!updateResp && updateResp?.status === "success") {
      successToast("Succesfully Updated Agent");
      reset();
      onClose();
    }
  }, [updateResp]);

  useEffect(() => {
    if (!!deleteResp && deleteResp?.status === "success") {
      successToast("Succesfully Deleted Agent");
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
    <ModalCard isOpen={isOpen} onClose={onClose}>
      <Box p="4" h="80vh" overflowY="auto" sx={customScrollBar3}>
        <LargeHeading>Update Agent</LargeHeading>

        <form onSubmit={handleSubmit(handleUpdateAgent)}>
          <Grid my="6" gap="3">
            <Stack>
              <Text fontSize="12px">Agent Full Name</Text>
              <Input placeholder="Agent Name" {...register("agent_name")} />
              <InputError msg={errors?.agent_name?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Agent Nickname</Text>
              <Input
                placeholder="Agent Nickname"
                {...register("agent_nickname")}
              />
              <InputError msg={errors?.agent_nickname?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Agent Email</Text>
              <Input
                placeholder="agent@email.com"
                type="email"
                {...register("agent_email")}
              />
              <InputError msg={errors?.agent_email?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Select Country</Text>
              <Select
                placeholder="Select country"
                {...register("recipient_country")}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </Select>
              <InputError msg={errors?.recipient_country?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Bank Type</Text>
              <Select placeholder="Select Bank Type" {...register("type")}>
                <option value={"Local Bank Account"}>Local Bank Account</option>
                <option value={"ACH"}>ACH</option>
                <option value={"SWIFT"}>SWIFT</option>
              </Select>
              <InputError msg={errors?.type?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Account Type</Text>
              <Select
                placeholder="Select Bank Type"
                {...register("account_type")}
              >
                <option value={"CHECKING"}>CHECKING</option>
                <option value={"SAVINGS"}>SAVINGS</option>
              </Select>
              <InputError msg={errors?.account_type?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Recipient Type</Text>
              <Select
                placeholder="Select Recipient Type"
                {...register("recipient_type")}
              >
                <option value={"PERSONAL"}>PERSONAL</option>
                <option value={"BUSINESS"}>BUSINESS</option>
              </Select>
              <InputError msg={errors?.recipient_type?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Agent Phone No.</Text>
              <Input placeholder="080X XXX XXXX" {...register("agent_phone")} />
              <InputError msg={errors?.agent_phone?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Agent Account Name</Text>
              <Input placeholder="Account Name" {...register("account_name")} />
              <InputError msg={errors?.account_name?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Agent Bank Name</Text>
              <Input placeholder="Bank Name" {...register("bank_name")} />
              <InputError msg={errors?.bank_name?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Agent Account Number</Text>
              <Input placeholder="102XXXXXXX" {...register("account_number")} />
              <InputError msg={errors?.account_number?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">SWIFT Code</Text>
              <Input
                placeholder="Enter SWIFT Code"
                {...register("swift_code")}
              />
              <InputError msg={errors?.swift_code?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">ACH Routing Number</Text>
              <Input
                placeholder="Enter ACH Routing Number"
                {...register("ach_routing_number")}
              />
              <InputError msg={errors?.ach_routing_number?.message} />
            </Stack>
          </Grid>

          <Button type="submit" my="6" isLoading={isLoading}>
            Update
          </Button>
          <Button
            color="red"
            variant="link"
            isLoading={deleting}
            onClick={onDeleteOpen}
          >
            Delete Agent
          </Button>
        </form>
      </Box>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        primaryFunc={{ name: "Delete Agent", func: handleDelete }}
        message={"Are you sure you want to delete this agent"}
        isLoading={deleting}
      />
    </ModalCard>
  );
};

export default UpdateAgent;
