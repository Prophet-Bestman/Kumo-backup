import { Flex, Td, Text, Tr } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { cryptoNumberWithCommas } from "utils/helpers";
// import { cryptoNumberWithCommas } from "utils/helpers";

const TransactionRow = ({ transaction, number }) => {
  const { type, amount_paid_in_naira, from, to, currency, status, created_at } =
    transaction;

  console.log(transaction);

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
              {type?.includes("BUY") ? "KUMO" : from}
            </Text>
          </Flex>
          <Flex>
            <Text>To:</Text>
            <Text fontSize={"13px"} color="app.primary.900">
              {type?.includes("SELL") ? "KUMO" : to}
            </Text>
          </Flex>
        </Td>

        <Td
          fontWeight="700"
          fontSize={"13px"}
          // color={type === "credit" ? "app.success" : "app.red"}
        >
          {/* N{amount_paid_in_naira?.toLocaleString() || 0}N */}
          {cryptoNumberWithCommas(amount_paid_in_naira) || 0}
        </Td>

        <Td fontWeight={700} fontSize={"13px"} textTransform="capitalize">
          {currency}
        </Td>
        <Td fontWeight={700} fontSize={"13px"} textTransform="capitalize">
          {status}
        </Td>
        <Td fontSize={"13px"} textTransform="capitalize">
          {/* {format(new Date(created_at), "dd-MM-yyyy")} */}
          {new Date(created_at).toDateString()},{" "}
          {new Date(created_at).toLocaleTimeString()}
        </Td>
      </Tr>
    </Link>
  );
};

export default TransactionRow;
