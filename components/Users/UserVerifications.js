import { Box, Grid, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { getStatusColor } from "utils/helpers";

const UserVerifications = ({ user }) => {
  return (
    <Box p="10" bg="white" boxShadow="sm">
      <form>
        <Grid templateColumns={"repeat(2, 1fr)"} gap="8" rowGap="10">
          <Stack>
            <Text ml="2" fontSize="12px" fontWeight={600}>
              Account Status
            </Text>
            <Input
              disabled
              value={user?.status?.toUpperCase()}
              color={getStatusColor(user?.status)}
            />
          </Stack>
          <Stack>
            <Text ml="2" fontSize="12px" fontWeight={600}>
              Email Status
            </Text>
            <Input
              disabled
              value={user?.is_verified ? "Verified" : "Unverified"}
              color={getStatusColor(user?.is_verified)}
            />
          </Stack>
          <Stack>
            <Text ml="2" fontSize="12px" fontWeight={600}>
              Phone No. Status
            </Text>
            <Input
              disabled
              value={user?.phone_number_verified ? "Verified" : "Unverified"}
              color={getStatusColor(user?.phone_number_verified)}
            />
          </Stack>
          <Stack>
            <Text ml="2" fontSize="12px" fontWeight={600}>
              User BVN
            </Text>
            <Input
              disabled
              value={user?.bvn?.bvn_number || "No BVN registered"}
            />
          </Stack>
          <Stack>
            <Text ml="2" fontSize="12px" fontWeight={600}>
              Kyc Status
            </Text>
            <Input
              disabled
              value={user?.bvn?.verified ? "Verified" : "Unverified"}
              color={getStatusColor(user?.bvn?.verified)}
            />
          </Stack>
          <Stack>
            <Text ml="2" fontSize="12px" fontWeight={600}>
              Two Factor Authentication Status
            </Text>
            <Input
              disabled
              value={user?.two_factor_verification ? "Verified" : "Unverified"}
              color={getStatusColor(user?.two_factor_verification)}
            />
          </Stack>
        </Grid>
      </form>
    </Box>
  );
};

export default UserVerifications;
