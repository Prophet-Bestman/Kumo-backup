import { Table, TableContainer, Td, Thead } from "@chakra-ui/react";
import transactions from "data/transactions";
import React from "react";
import { customScrollBar2, customScrollBar3 } from "utils/styles";
import TransactionRow from "./TransactionRow";

const TransactionsTable = () => {
  return (
    <TableContainer
      w="full"
      bg="white"
      rounded="md"
      h="410px"
      shadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;"
      overflowY="auto"
      sx={customScrollBar3}
    >
      <Table w="full" variant="unstyled">
        <Thead fontSize="12px">
          <Td w="45%">From</Td>
          <Td>Trans ID</Td>
          <Td>Amount</Td>
        </Thead>
        {transactions?.length > 0 &&
          transactions
            ?.slice(0, 6)
            ?.map((transaction, i) => (
              <TransactionRow key={i} transaction={transaction} />
            ))}
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
