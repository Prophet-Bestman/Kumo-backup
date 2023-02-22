import {
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import LargeHeading from "components/LargeHeading";
// import referrals from "data/referrals";

import React from "react";
import { customScrollBar3 } from "utils/styles";

const ReferralsTable = ({ referrals, isLoading }) => {
  return (
    <div>
      <LargeHeading my="6">Referrals</LargeHeading>
      <TableContainer
        w="full"
        bg="white"
        rounded="md"
        // h="410px"
        shadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;"
        overflowY="auto"
        sx={customScrollBar3}
        p="4"
      >
        {isLoading ? (
          <Progress isIndeterminate colorScheme={"gray"} />
        ) : (
          !!referrals &&
          referrals?.length > 0 && (
            <Table w="full" variant="unstyled">
              <Thead fontSize="12px">
                <Tr>
                  <Th w="5%">S/N</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                </Tr>
              </Thead>
              <Tbody>
                {referrals?.length > 0 &&
                  referrals?.slice(0, 6)?.map((referral, i) => (
                    <Tr key={i} borderBottom="1px" borderColor="gray.200">
                      <Td color="gray.400">{i + 1}</Td>
                      <Td>
                        {referral?.first_name} {referral?.last_name}
                      </Td>
                      <Td>{referral?.email}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          )
        )}
      </TableContainer>
    </div>
  );
};

export default ReferralsTable;
