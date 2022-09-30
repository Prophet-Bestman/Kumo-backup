import { Circle, Flex, Td, Text, Tr } from "@chakra-ui/react";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { numberWithCommas } from "utils/helpers";

const TransactionRow = ({ transaction, number }) => {
  const {
    type,
    amount_paid_in_naira,
    from,
    to,
    currency,
    date,
    method,
    status,
    created_at,
  } = transaction;
  return (
    <Link href={`/transactions/${transaction?._id}`}>
      <Tr
        cursor="pointer"
        rounded="md"
        fontSize="12px"
        _hover={{
          shadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;",
          borderWidth: "1px",
          borderColor: "#eeeeee",
        }}
      >
        <Td fontWeight={700} w="50px">
          {number}
        </Td>
        <Td>
          <Text fontSize="14px" fontWeight={700} color="app.primary.900">
            {type}
          </Text>
        </Td>

        <Td>
          <Flex>
            <Text>From:</Text>
            <Text fontSize={"13px"} color="app.primary.900">
              {from}
            </Text>
          </Flex>
          <Flex>
            <Text>To:</Text>
            <Text fontSize={"13px"} color="app.primary.900">
              {to}
            </Text>
          </Flex>
        </Td>

        <Td
          fontWeight="700"
          fontSize={"13px"}
          // color={type === "credit" ? "app.success" : "app.red"}
        >
          N{numberWithCommas(amount_paid_in_naira || 0)}
        </Td>

        <Td fontWeight={700} fontSize={"13px"} textTransform="capitalize">
          {currency}
        </Td>
        <Td fontWeight={700} fontSize={"13px"} textTransform="capitalize">
          {status}
        </Td>
        <Td fontSize={"13px"} textTransform="capitalize">
          {format(new Date(created_at), "dd-MM-yyyy")}
        </Td>
      </Tr>
    </Link>
  );
};

export default TransactionRow;
