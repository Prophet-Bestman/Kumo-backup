import { Box, Grid } from "@chakra-ui/react";
import { useSingleGetUser } from "api/users";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { UserCards, UserInfo, UserWallets } from "components/Users";

const UserDetailsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const { userDetails } = router.query;

  const { data: userResp, isLoading } = useSingleGetUser(userDetails);

  useEffect(() => {
    if (!!userResp && userResp?.status == "success") {
      setUser(userResp?.data);
    }
  }, [userResp]);

  return (
    <Box p="6">
      <Grid templateColumns="repeat(3, 1fr)" gap="4">
        {isLoading ? <UserSkeleton /> : !!user && <UserInfo user={user} />}
        {isLoading ? <UserSkeleton /> : !!user && <UserWallets user={user} />}
        {isLoading ? <UserSkeleton /> : !!user && <UserCards user={user} />}
      </Grid>
    </Box>
  );
};

export default UserDetailsPage;

UserDetailsPage.requireAuth = true;

const UserSkeleton = () => {
  return (
    <Box padding="6" boxShadow="md" bg="white" h="400px">
      <SkeletonCircle size="20" mx="auto" />
      <SkeletonText mt="4" noOfLines={2} spacing="4" />

      <Grid templateColumns="repeat(3, 1fr)" gap="4" mt="8">
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Grid>
    </Box>
  );
};
