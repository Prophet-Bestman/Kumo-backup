import {
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
import { getStatusColor, getWalletBalanceFromUser } from "utils/helpers";
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
        <Loader />
      ) : (
        <Table w="full" variant="unstyled">
          <Thead fontSize="12px">
            <Tr>
              <Th>S/N</Th>
              <Th>First Name</Th>
              <Th>LastName</Th>
              <Th>Email</Th>
              {/* <Th>Username</Th> */}
              <Th>Phone Number</Th>
              <Th>KYC Status</Th>
              <Th>Verification Status</Th>
              <Th>ETH</Th>
              <Th>BTC</Th>
              <Th>DASH</Th>
              <Th>FORGE</Th>
              <Th>KUMO USD</Th>
              <Th>SHIB</Th>
              <Th>BEST TOKEN</Th>

              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody fontSize="12px">
            {users?.length > 0 &&
              users.map((user, i) => (
                <Tr key={user?._id}>
                  <Td fontWeight={700} w="50px">
                    {i + 1}
                  </Td>
                  <Td>{user?.first_name}</Td>
                  <Td>{user?.last_name}</Td>
                  <Td>{user?.email}</Td>
                  {/* <Td>{username}</Td> */}
                  <Td>{user?.phone_number}</Td>
                  <Td>
                    <Tag
                      w="100px"
                      textAlign="center"
                      textTransform="capitalize"
                      // colorScheme={
                      //   verified !== "false" && verified !== false
                      //     ? "green"
                      //     : "red"
                      // }
                      justifyContent="center"
                      color={getStatusColor(user?.admin_reply)}
                    >
                      {user?.admin_reply}
                    </Tag>
                  </Td>
                  <Td>
                    <Tag
                      w="100px"
                      textAlign="center"
                      colorScheme={user?.is_verified ? "green" : "red"}
                      justifyContent="center"
                    >
                      {user?.is_verified ? "Verified" : "Unverified"}
                    </Tag>
                  </Td>

                  <Td>{getWalletBalanceFromUser(user, "ethereum")}</Td>
                  <Td>{getWalletBalanceFromUser(user, "bitcoin")}</Td>
                  <Td>{getWalletBalanceFromUser(user, "dash")}</Td>
                  <Td>{getWalletBalanceFromUser(user, "forge")}</Td>
                  <Td>{getWalletBalanceFromUser(user, "kumo usd")}</Td>
                  <Td>{getWalletBalanceFromUser(user, "shib")}</Td>
                  <Td>{getWalletBalanceFromUser(user, "best token")}</Td>

                  <Td>
                    <Link href={`/users/${_id}`}>
                      <Button size="sm" variant="link">
                        View
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
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
