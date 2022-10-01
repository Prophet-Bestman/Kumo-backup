import {
  Box,
  Button,
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { customScrollBar3 } from "utils/styles";
import AgentRow from "./AgentRow";

const AgentsTable = ({ agents, isLoading }) => {
  return (
    <TableContainer
      w="full"
      bg="white"
      rounded="md"
      shadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;"
      overflowY="auto"
      sx={customScrollBar3}
      h="410px"
      p="4"
    >
      {isLoading ? (
        // <Spinner size="xl" color="app.primary.900" />
        <Loader />
      ) : (
        <Table w="full" variant="unstyled" size="sm">
          <Thead fontSize="12px">
            <Tr>
              <Th w="50px">S/N</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone Number</Th>
              <Th>Verification</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {agents?.length > 0 &&
              agents.map((agent, i) => (
                <AgentRow agent={agent} key={agent?._id} number={i + 1} />
              ))}
          </Tbody>
        </Table>
      )}
    </TableContainer>
  );
};

export default AgentsTable;

const Loader = () => {
  return (
    <Flex h="410px" w="full" justify="center" alignItems="center">
      <Spinner size="xl" color="app.primary.900" />
    </Flex>
  );
};
