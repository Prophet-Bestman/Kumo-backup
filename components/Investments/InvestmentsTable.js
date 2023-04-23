import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import Loader from "components/Loader";
import React from "react";
import { customScrollBar3 } from "utils/styles";
import InvestmentRow from "./InvestmentRow";

const InvestmentsTable = ({ investments, isLoading }) => {
  return (
    <TableContainer
      w="full"
      bg="white"
      rounded="md"
      shadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;"
      overflowY="auto"
      sx={customScrollBar3}
      maxH="410px"
      py="4"
      px={[, , "4"]}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Table w="full" variant="unstyled" size="sm">
          <Thead fontSize="12px">
            <Tr>
              <Th w="50px">S/N</Th>
              <Th>Name</Th>
              <Th>User</Th>
              <Th>Amount </Th>
              <Th>Token</Th>
              <Th>Rate</Th>
              <Th>Start Date</Th>
              <Th>Redemption Date</Th>
              <Th>APR</Th>
              <Th>Duration </Th>

              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {investments?.length > 0 &&
              investments.map((investment, i) => (
                <InvestmentRow
                  investment={investment}
                  key={investment?._id}
                  number={i + 1}
                />
              ))}
          </Tbody>
        </Table>
      )}
    </TableContainer>
  );
};

export default InvestmentsTable;
