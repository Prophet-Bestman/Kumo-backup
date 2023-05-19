import { Box, Flex, Grid, Progress, Text } from "@chakra-ui/react";
import { useGetReferrals } from "api/users";
import ReferAndWin from "components/Dashboard/ReferAndWin";
import { ReferralsTable } from "components/Referrals";
import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect } from "react";
import { BiCopy } from "react-icons/bi";

const ReferralsPage = () => {
  const { setActiveNav } = useNavContext();
  useEffect(() => {
    setActiveNav(navStates.referrals);
  }, [setActiveNav, navStates]);

  const { data: referralsResp, isLoading } = useGetReferrals();

  return (
    <Box p="6">
      {/* <Grid templateColumns="repeat(2, 1fr)">
        <ReferAndWin />

        <Flex alignItems="center">
          <Box>
            <Text w="70%">
              Get bonus by referring new members to register using your referral
              link
            </Text>
            <Flex alignItems="center" gap="1" color="app.primary.300">
              <Text fontSize="20px" fontWeight={600}>
                wallet.kurepay.com/#/register?252555
              </Text>
              <BiCopy />
            </Flex>
          </Box>
        </Flex>
      </Grid> */}

      <ReferralsTable referrals={referralsResp?.data} isLoading={isLoading} />
    </Box>
  );
};

export default ReferralsPage;

ReferralsPage.requireAuth = true;
