import { Circle, Flex, Td, Text, Tr } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const TransactionRow = ({ transaction }) => {
  const { name, type, amount, date, method, transID } = transaction;
  return (
    <Link href="/transactions/transactionDetails">
      <Tr
        cursor="pointer"
        rounded="md"
        _hover={{
          shadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;",
          borderWidth: "1px",
          borderColor: "#eeeeee",
        }}
      >
        <Td>
          <Flex gap="4">
            <Circle
              rounded="md"
              color="white"
              bg="app.primary.900"
              size="36px"
              fontSize="13px"
              lineHeight="0"
              fontWeight={700}
            >
              OT
            </Circle>

            <Flex flexDir="column" justifyContent="space-between">
              <Text fontSize="14px" fontWeight={700} color="app.primary.900">
                {name}
              </Text>
              <Text fontSize="12px">{method}</Text>
            </Flex>
          </Flex>
        </Td>

        <Td>
          <Text fontSize={"13px"} color="app.primary.900">
            {transID}
          </Text>
          <Text fontSize={"11px"} color="app.greyText">
            {date}
          </Text>
        </Td>

        <Td
          fontWeight="700"
          color={type === "credit" ? "app.success" : "app.red"}
        >
          {amount}
        </Td>
      </Tr>
    </Link>
  );
};

export default TransactionRow;
