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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDeletePackage, useUpdatePackage } from "api/investment";
import { ModalCard, LargeHeading, InputError, ConfirmModal } from "components";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getStatusColor,
  handleRequestError,
  numberWithCommas,
} from "utils/helpers";
import { updatePackageSchema } from "utils/schema";
import { customScrollBar3 } from "utils/styles";
import AddToken from "./AddToken";
import TokenTag from "./TokenTag";

const InvestmentDetails = ({ isOpen, onClose, investment }) => {
  const [status, setStatus] = useState(investment?.investment_status);

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
  } = investment;

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
