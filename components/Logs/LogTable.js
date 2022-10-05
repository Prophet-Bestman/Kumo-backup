import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import Loader from "components/Loader";
import { format } from "date-fns";
import React from "react";
import { customScrollBar3 } from "utils/styles";

const LogTable = ({ logs, isLoading }) => {
  return (
    <TableContainer
      w="full"
      bg="white"
      rounded="md"
      shadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;"
      overflowY="auto"
      sx={customScrollBar3}
      maxH="410px"
      p="4"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Table w="full" variant="simple" size="sm">
          <Thead fontSize="12px">
            <Tr>
              <Th>S/N</Th>
              <Th>Event</Th>
              <Th>Level</Th>
              <Th>Log</Th>
              <Th>status</Th>
              <Th>time</Th>
            </Tr>
          </Thead>

          <Tbody>
            {logs?.length > 0 &&
              logs.map((singleLog, i) => {
                const { created_at, event, level, log, status, _id } =
                  singleLog;
                return (
                  //   <TransactionRow  transaction={transaction} />
                  <Tr key={_id}>
                    <Td fontWeight={700} w="50px">
                      {i + 1}
                    </Td>
                    <Td>{event}</Td>
                    <Td>{level}</Td>
                    <Td>
                      <Tooltip cursor="pointer" label={log}>
                        <Text
                          textOverflow="ellipsis"
                          maxW="250px"
                          overflow="hidden"
                        >
                          {log}
                        </Text>
                      </Tooltip>
                    </Td>
                    <Td>{status}</Td>
                    <Td></Td>
                    <Td>{format(new Date(created_at), "dd-MM-yyyy")}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      )}
    </TableContainer>
  );
};

export default LogTable;
