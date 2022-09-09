import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
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
      p="4"
    >
      <Table w="full" variant="unstyled">
        <Thead fontSize="12px">
          <Tr>
            <Th w="45%">From</Th>
            <Th>Trans ID</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions?.length > 0 &&
            transactions
              ?.slice(0, 6)
              ?.map((transaction, i) => (
                <TransactionRow key={i} transaction={transaction} />
              ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
