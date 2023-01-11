import {
  Box,
  Button,
  Grid,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateAgent } from "api/agents";
import { ModalCard, LargeHeading, InputError } from "components";
import countries from "data/coutriesAndCode";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleRequestError } from "utils/helpers";
import { createAgentSchema } from "utils/schema";
import { customScrollBar3 } from "utils/styles";

const AddAgent = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createAgentSchema) });

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Succesfully Created Agent",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    mutate: createAgent,
    data: createResp,
    error: createError,
    isLoading,
    reset,
  } = useCreateAgent();

  const handleCreate = (data) => {
    const payload = {
      ...data,
      agent_phone: `+${data.country}${Number.parseInt(data.agent_phone)}`,
    };

    createAgent(payload);
  };

  useEffect(() => {
    if (!!createResp && createResp?.status === "success") {
      successToast();
      reset();
      onClose();
    }
  }, [createResp]);

  useEffect(() => {
    handleRequestError(createError);
    reset();
  }, [createError]);

  return (
    <ModalCard isOpen={isOpen} onClose={onClose}>
      <Box p="4" h="80vh" overflowY="auto" sx={customScrollBar3}>
        <LargeHeading>Create Agent</LargeHeading>

        <form onSubmit={handleSubmit(handleCreate)}>
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
              <Select placeholder="Select country" {...register("country")}>
                {countries.map((country) => (
                  <option key={country.code} value={country.phone}>
                    {country.name}
                  </option>
                ))}
              </Select>
              <InputError msg={errors?.country?.message} />
            </Stack>
            <Stack>
              <Text fontSize="12px">Agent Phone No.</Text>
              <Input
                placeholder="080X XXX XXXX"
                type="tel"
                {...register("agent_phone")}
              />
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
              <Input
                placeholder="102XXXXXXX"
                type="tel"
                {...register("account_number")}
              />
              <InputError msg={errors?.account_number?.message} />
            </Stack>
          </Grid>

          <Button type="submit" my="6" isLoading={isLoading}>
            Create
          </Button>
        </form>
      </Box>
    </ModalCard>
  );
};

export default AddAgent;
