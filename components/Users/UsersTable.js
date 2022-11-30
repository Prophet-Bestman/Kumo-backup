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

const UsersTable = ({ users, isLoading }) => {
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
        // <Spinner size="xl" color="app.primary.900" />
        <Loader />
      ) : (
        <Table w="full" variant="unstyled">
          <Thead fontSize="12px">
            <Tr>
              <Th>S/N</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              {/* <Th>Username</Th> */}
              <Th>Phone Number</Th>
              <Th>Verification</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.length > 0 &&
              users.map((user, i) => {
                const {
                  last_name,
                  first_name,
                  email,
                  // username,
                  phone_number,
                  is_verified,
                  _id,
                } = user;
                return (
                  //   <TransactionRow  transaction={transaction} />
                  <Tr key={user?._id}>
                    <Td fontWeight={700} w="50px">
                      {i + 1}
                    </Td>
                    <Td>
                      {first_name} {last_name}
                    </Td>
                    <Td>{email}</Td>
                    {/* <Td>{username}</Td> */}
                    <Td>{phone_number}</Td>
                    <Td>
                      <Tag
                        w="100px"
                        textAlign="center"
                        colorScheme={is_verified ? "green" : "red"}
                        justifyContent="center"
                      >
                        {is_verified ? "Verified" : "Unverified"}
                      </Tag>
                    </Td>
                    <Td>
                      <Link href={`/users/${_id}`}>
                        <Button size="sm" variant="link">
                          View
                        </Button>
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      )}
    </TableContainer>
  );
};

export default UsersTable;

const Loader = () => {
  return (
    <Flex h="410px" w="full" justify="center" alignItems="center">
      <Spinner size="xl" color="app.primary.900" />
    </Flex>
  );
};
