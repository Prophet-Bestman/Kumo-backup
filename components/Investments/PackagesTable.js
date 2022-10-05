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
import Loader from "components/Loader";
import React from "react";
import { customScrollBar3 } from "utils/styles";
import PackageRow from "./PackageRow";

const PackagesTable = ({ packages, isLoading }) => {
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
        <Table w="full" variant="unstyled" size="sm">
          <Thead fontSize="12px">
            <Tr>
              <Th w="50px">S/N</Th>
              <Th>Name</Th>
              <Th>Created By</Th>
              <Th>Package APR</Th>
              <Th>Duration</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {packages?.length > 0 &&
              packages.map((singlePackage, i) => (
                <PackageRow
                  singlePackage={singlePackage}
                  key={singlePackage?._id}
                  number={i + 1}
                />
              ))}
          </Tbody>
        </Table>
      )}
    </TableContainer>
  );
};

export default PackagesTable;
