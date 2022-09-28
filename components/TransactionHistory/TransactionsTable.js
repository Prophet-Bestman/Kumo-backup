import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
// import transactions from "data/transactions";
import React from "react";
import { customScrollBar3 } from "utils/styles";
import TransactionRow from "./TransactionRow";

const TransactionsTable = ({ transactions }) => {
  return (
    <TableContainer
      w="full"
      bg="white"
      rounded="md"
      h="410px"
      shadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;"
      overflowY="auto"
      sx={customScrollBar3}
      p="4"
    >
      <Table w="full" variant="unstyled" size="sm">
        <Thead fontSize="12px">
          <Tr>
            <Th>Type</Th>
            <Th>Method</Th>
            <Th>Amount</Th>
            <Th>Currency</Th>
            <Th>Status</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions?.length > 0 &&
            transactions?.map((transaction) => (
              <TransactionRow
                key={transaction?._id}
                transaction={transaction}
              />
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
