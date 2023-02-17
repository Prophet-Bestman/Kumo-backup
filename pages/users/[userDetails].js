import { Box, Grid, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useSingleGetUser } from "api/users";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import {
  UserDetails,
  UserTransactions,
  UserVerifications,
  UserWallets,
} from "components/Users";

import { CustomTabList } from "components";
import UserActions from "components/Users/UserActions";
import InvestmentsTable from "components/Investments/InvestmentsTable";
import { useGetUserInvestments } from "api/investment";

const tabList = [
  { title: "Detail" },
  { title: "Verification" },
  { title: "Wallet" },
  { title: "Investment History" },
  { title: "Settings" },
];

const UserDetailsPage = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [investments, setInvestments] = useState([]);

  const { userDetails } = router.query;

  const { data: userResp, isLoading } = useSingleGetUser(userDetails, {
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (!!userResp && userResp?.status == "success") {
      setUser(userResp?.data);
    }
  }, [userResp]);

  const { data: investmentsResp } = useGetUserInvestments(userDetails);

  useEffect(() => {
    if (!!investmentsResp && investmentsResp?.status === "success") {
      setInvestments(investmentsResp?.data);
    }
  }, [investmentsResp]);

  return (
    <Box p="6">
      <Box mb="12">
        <Tabs>
          <CustomTabList tabList={tabList} />

          {isLoading ? (
            <UserSkeleton />
          ) : (
            !!user && (
              <>
                <TabPanels>
                  <TabPanel>
                    <UserDetails user={user} />
                  </TabPanel>
                  <TabPanel>
                    <UserVerifications user={user} />
                  </TabPanel>
                  <TabPanel>
                    <UserWallets user={user} />
                  </TabPanel>
                  <TabPanel>
                    {
                      <InvestmentsTable
                        isLoading={isLoading}
                        investments={investments}
                      />
                    }
                  </TabPanel>
                  <TabPanel>
                    {!!user && (
                      <UserActions user_id={userDetails} user={user} />
                    )}
                  </TabPanel>
                </TabPanels>
                <UserTransactions user={user} />
              </>
            )
          )}
        </Tabs>
      </Box>
    </Box>
  );
};

export default UserDetailsPage;

UserDetailsPage.requireAuth = true;

const UserSkeleton = () => {
  return (
    <Box padding="6" boxShadow="md" bg="white" h="400px">
      <SkeletonCircle size="20" />
      <SkeletonText mt="4" noOfLines={2} spacing="4" />

      <Grid templateColumns="repeat(3, 1fr)" gap="4" mt="8">
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Grid>
    </Box>
  );
};
