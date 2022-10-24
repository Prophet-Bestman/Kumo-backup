import { Button, Tag, Td, Tr, useDisclosure } from "@chakra-ui/react";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { getStatusColor } from "utils/helpers";
import UpdatePackage from "./UpdatePackage";
import { numberWithCommas } from "utils/helpers";
import InvestmentDetails from "./InvestmentDetails";
// import UpdateAgent from "./UpdateAgent";

const InvestmentRow = ({ investment, number }) => {
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
  } = investment;

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    //   <TransactionRow  transaction={transaction} />
    <Tr key={investment?._id} textAlign="center">
      <Td>{number}</Td>
      <Td>{investment_name}</Td>
      <Td>{user_name}</Td>
      <Td>{numberWithCommas(investment_amount)}</Td>
      <Td textTransform="capitalize">{investment_token?.split("(")[0]}</Td>
      <Td>{investment_token_rate}</Td>
      <Td>{format(new Date(investment_start_date), "dd-MM-yyyy")}</Td>
      <Td>{format(new Date(investment_redemption_date), "dd-MM-yyyy")}</Td>

      <Td>{investment_apr}</Td>
      <Td>{investment_duration} </Td>
      <Td>
        <Tag
          textTransform="capitalize"
          color={getStatusColor(investment_status)}
        >
          {investment_status}
        </Tag>
      </Td>

      <Td>
        <Button size="sm" h="32px" onClick={onOpen}>
          Details
        </Button>
      </Td>
      {isOpen && (
        <InvestmentDetails
          investment={investment}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Tr>
  );
};

export default InvestmentRow;
