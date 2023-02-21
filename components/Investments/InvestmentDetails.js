import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  useAdminActivateInvestment,
  useAdminTerminateInvestment,
} from "api/investment";
import { ModalCard, LargeHeading, ConfirmModal } from "components";
import { format } from "date-fns";
import React, { useEffect } from "react";
import {
  getStatusColor,
  handleRequestError,
  numberWithCommas,
} from "utils/helpers";

const InvestmentDetails = ({ isOpen, onClose, investment }) => {
  const {
    investment_name,
    investment_amount,
    investment_token_rate,
    investment_token,
    investment_duration,
    investment_apr,
    investment_status,
    investment_start_date,
    investment_redemption_date,
    user_name,
    terminated_info,
    _id,
    user_id,
  } = investment;

  const {
    isOpen: isConfirmOopen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure();

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Action Successful",
      description: "Succesfully Updated Investment",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  const {
    mutate: terminate,
    isLoading,
    data: terminateResp,
    error: terminateError,
    reset,
  } = useAdminTerminateInvestment();

  const {
    mutate: activate,
    isLoading: activating,
    data: activateResp,
    error: activateError,
    reset: resetActivate,
  } = useAdminActivateInvestment();

  useEffect(() => {
    if (!!activateResp && activateResp?.status === "success") {
      successToast();
      resetActivate();
      onClose();
    }
  }, [activateResp]);

  useEffect(() => {
    if (!!terminateResp && terminateResp?.status === "success") {
      successToast();
      reset();
      onClose();
    }
  }, [terminateResp]);

  useEffect(() => {
    handleRequestError(terminateError);
    reset();
    handleRequestError(activateError);
    resetActivate();
  }, [terminateError, activateError]);

  return (
    <ModalCard isOpen={isOpen} onClose={onClose} size="2xl">
      <LargeHeading my="4">Investment Details</LargeHeading>

      <Grid mb="30px" templateColumns={"repeat(3, 1fr)"} rowGap="8">
        <InvestmentItem title="User Name" value={user_name} />
        <InvestmentItem title="Name" value={investment_name} />
        <InvestmentItem
          title="Amount"
          value={numberWithCommas(investment_amount)}
        />
        <InvestmentItem
          title="Token Name"
          value={investment_token?.split("(")[0]}
        />
        <InvestmentItem title="Token Rate" value={investment_token_rate} />

        <Flex gap="5">
          <InvestmentItem title="APR" value={investment_apr} />

          <InvestmentItem title="Duration" value={investment_duration} />
        </Flex>

        <InvestmentItem
          title="Start Date"
          value={format(new Date(investment_start_date), "dd-MM-yyyy")}
        />
        <InvestmentItem
          title="Redemption Date"
          value={format(new Date(investment_redemption_date), "dd-MM-yyyy")}
        />
        <InvestmentItem
          title="Status"
          value={
            <Text
              textTransform="capitalize"
              color={getStatusColor(investment_status)}
            >
              {investment_status}
            </Text>
          }
        />
      </Grid>

      {Object?.keys(terminated_info).length > 0 && (
        <Box>
          <Text size="20px" fontWeight={600} color="app.primary.700">
            Terminated Info
          </Text>
          <Grid mb="30px" templateColumns={"repeat(1, 1fr)"} rowGap="8">
            <InvestmentItem
              title="Estimated ROI"
              value={numberWithCommas(terminated_info?.estimated_roi)}
            />
            <InvestmentItem
              title="Name"
              value={format(
                new Date(terminated_info?.terminated_date),
                "dd-MM-yyyy"
              )}
            />
            <InvestmentItem
              title="Terminated ROI"
              value={"N" + numberWithCommas(terminated_info?.terminated_roi)}
            />
          </Grid>
        </Box>
      )}
      {investment_status === "ongoing" ? (
        <Button size="sm" my="4" p="5" onClick={onConfirmOpen}>
          Terminate Investment
        </Button>
      ) : (
        <Button
          size="sm"
          my="4"
          p="5"
          onClick={() => activate({ id: _id })}
          isLoading={activating}
        >
          Activate Investment
        </Button>
      )}

      {isConfirmOopen && (
        <ConfirmModal
          isLoading={isLoading}
          isOpen={isConfirmOopen}
          onClose={onConfirmClose}
          message="Are you sure you want to terminate this investment?"
          primaryFunc={{
            func: () =>
              terminate({
                id: _id,
                user_id: user_id,
              }),
            name: "Terminate",
          }}
        />
      )}
    </ModalCard>
  );
};

export default InvestmentDetails;

const InvestmentItem = ({ title, value }) => {
  return (
    <Box>
      <Text fontSize="14px" fontWeight={600}>
        {title}
      </Text>
      <Text>{value}</Text>
    </Box>
  );
};
