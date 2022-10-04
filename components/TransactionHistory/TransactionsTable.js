import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import Loader from "components/Loader";
// import transactions from "data/transactions";
import React from "react";
import { customScrollBar3 } from "utils/styles";
import TransactionRow from "./TransactionRow";

const TransactionsTable = ({ transactions, isLoading }) => {
  return (
    <TableContainer
      w="full"
      bg="white"
      rounded="md"
      maxH="410px"
      shadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;"
      overflowY="auto"
      sx={customScrollBar3}
      p="4"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Table w="full" variant="unstyled" size="sm">
          <Thead fontSize="12px">
            <Tr>
              <Th>S/N</Th>
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
              transactions?.map((transaction, i) => (
                <TransactionRow
                  key={transaction?._id}
                  number={i + 1}
                  transaction={transaction}
                />
              ))}
          </Tbody>
        </Table>
      )}
    </TableContainer>
  );
};

export default TransactionsTable;
