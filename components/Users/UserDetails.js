import { Avatar, Box, Grid, Input, Stack, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";

const UserDetails = ({ user }) => {
  // console.log(user);
  return (
    <Box py="14" px="10" bg="white" boxShadow="sm">
      <Avatar
        src={user?.image_url}
        name={`${user?.first_name} ${user?.last_name}`}
        mb="12"
        size="2xl"
      />

      <form>
        <Grid templateColumns={"repeat(2, 1fr)"} gap="4" rowGap="10">
          <Stack>
            <Text ml="2" fontSize="12px" fontWeight={600}>
              ID
            </Text>
            <Input disabled value={user?._id} />
          </Stack>
          <Stack>
            <Text ml="2" fontSize="12px" fontWeight={600}>
              Phone Number
            </Text>
            <Input disabled value={user?.phone_number} />
          </Stack>
          <Stack>
            <Text ml="2" fontSize="12px" fontWeight={600}>
              First Name
            </Text>
            <Input disabled value={user?.first_name} />
          </Stack>
          <Stack>
            <Text ml="2" fontSize="12px" fontWeight={600}>
              Last Name
            </Text>
            <Input disabled value={user?.last_name} />
          </Stack>
          <Stack>
            <Text ml="2" fontSize="12px" fontWeight={600}>
              Referral ID
            </Text>
            <Input disabled value={user?.user_referral_id} />
          </Stack>
          <Stack>
            <Text ml="2" fontSize="12px" fontWeight={600}>
              Date of creation
            </Text>
            {!!user?.created_at && (
              <Input
                disabled
                value={format(new Date(user?.created_at), "dd-MM-yyyy")}
              />
            )}
          </Stack>
        </Grid>
      </form>
    </Box>
  );
};

export default UserDetails;
