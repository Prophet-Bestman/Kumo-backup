import {
  Box,
  Flex,
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import LargeHeading from "components/LargeHeading";
import Link from "next/link";
import React from "react";

const BasicTransactionDetails = ({ transaction, user }) => {
  return (
    <Box mb="12" py="5">
      <LargeHeading>Transaction Details</LargeHeading>
      <Link href={`/users/${user?._id}`}>
        <Flex gap="2" fontSize="20px" my="2" cursor="pointer">
          <strong>User: </strong>
          <Text textDecor="underline" color="app.primary.700">
            {user?.first_name} {user?.last_name}
          </Text>
        </Flex>
      </Link>

      <Grid templateColumns={"repeat(2, 1fr)"} w={["100%", , , "75%"]} gap="8">
        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            Email
          </Text>
          <Input isReadOnly value={transaction?.email} />
        </Stack>
        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            Date & Time
          </Text>
          <Input
            isReadOnly
            value={`${new Date(
              transaction.created_at
            ).toDateString()},  ${new Date(
              transaction.created_at
            ).toLocaleTimeString()}`}
          />
        </Stack>
        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            Type
          </Text>
          <Input isReadOnly value={transaction?.type} />
        </Stack>
        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            Mode
          </Text>
          <Input isReadOnly value={transaction?.mode} />
        </Stack>

        {transaction?.type === "BANK TRANSFER" && (
          <>
            <GridItem colSpan={2}>
              <LargeHeading>Bank Transfer Details</LargeHeading>
            </GridItem>
            <Stack display="flex" gap="2" my="2">
              <Text fontWeight="semibold" fontSize="14px">
                Account Name
              </Text>
              <Input
                isReadOnly
                value={transaction?.service_object?.account_name}
              />
            </Stack>
            <Stack display="flex" gap="2" my="2">
              <Text fontWeight="semibold" fontSize="14px">
                Account Number
              </Text>
              <Input
                isReadOnly
                value={transaction?.service_object?.account_number}
              />
            </Stack>
            <Stack display="flex" gap="2" my="2">
              <Text fontWeight="semibold" fontSize="14px">
                Bank Name
              </Text>
              <Input
                isReadOnly
                value={transaction?.service_object?.bank_name}
              />
            </Stack>
            <br />
            <br />
          </>
        )}
        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            From
          </Text>
          <Input isReadOnly value={transaction?.from} />
        </Stack>
        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            To
          </Text>
          <Input isReadOnly value={transaction?.to} />
        </Stack>
        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            Base Currency
          </Text>
          <Input isReadOnly value={transaction?.base_currency?.name} />
        </Stack>
        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            Amount in Base Currency
          </Text>
          <Input isReadOnly value={transaction.amount_in_base_currency} />
        </Stack>

        {!!transaction?.currency && (
          <>
            <Stack display="flex" gap="2" my="2">
              <Text fontWeight="semibold" fontSize="14px">
                Crypto Currency
              </Text>
              <Input isReadOnly value={transaction?.currency?.name} />
            </Stack>
            <Stack display="flex" gap="2" my="2">
              <Text fontWeight="semibold" fontSize="14px">
                Amount in Crypto
              </Text>
              <Input isReadOnly value={transaction?.amount_in_crypto} />
            </Stack>
          </>
        )}

        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            Fee
          </Text>
          <Input isReadOnly value={transaction?.fee} />
        </Stack>
        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            Total Cost
          </Text>
          <Input isReadOnly value={transaction.total_cost} />
        </Stack>

        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            Transaction ID
          </Text>
          <Input isReadOnly value={transaction?.txRefId} />
        </Stack>
        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            Admin ID
          </Text>
          <Input isReadOnly value={transaction?.admin_id} />
        </Stack>
        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            Status
          </Text>
          <Input isReadOnly value={transaction?.status} />
        </Stack>
        <Stack display="flex" gap="2" my="2">
          <Text fontWeight="semibold" fontSize="14px">
            Is Complete
          </Text>
          <Input isReadOnly value={transaction?.isComplete} />
        </Stack>
      </Grid>
    </Box>
  );
};

export default BasicTransactionDetails;
