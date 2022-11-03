import { Box, Grid } from "@chakra-ui/react";
import { useSingleGetUser } from "api/users";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { UserCards, UserInfo, UserWallets } from "components/Users";
import { useGetTransactions, useGetTransactionsSize } from "api/transactions";
import { TransactionsTable } from "components/TransactionHistory";
import { Pagination } from "components";

const UserDetailsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const { userDetails } = router.query;

  console.log(pages);

  const { data: userResp, isLoading } = useSingleGetUser(userDetails);
  const { data: transactionsData, refetch } = useGetTransactions(
    page,
    userDetails
  );

  useEffect(() => {
    if (!!userResp && userResp?.status == "success") {
      setUser(userResp?.data);
    }
  }, [userResp]);

  //  ============= PAGINATION LOGIC ===============
  const { data: countResp } = useGetTransactionsSize(userDetails);

  useEffect(() => {
    if (!!countResp && countResp?.status === "success") {
      setPages(Math.ceil(countResp?.data?.total / 30));
    }
  }, [countResp]);

  console.log(countResp);

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <Box p="6">
      <Grid templateColumns="repeat(3, 1fr)" gap="4">
        {isLoading ? <UserSkeleton /> : !!user && <UserInfo user={user} />}
        {isLoading ? <UserSkeleton /> : !!user && <UserWallets user={user} />}
        {isLoading ? <UserSkeleton /> : !!user && <UserCards user={user} />}
      </Grid>

      <TransactionsTable transactions={transactionsData?.data} />
      <Pagination page={page} pages={pages} setPage={setPage} />
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
