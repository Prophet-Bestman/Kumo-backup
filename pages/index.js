import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useGetOverallStats } from "api/stats";
import {
  DashboardTransactions,
  GetLoans,
  PayWithKumo,
  QuickActions,
  RecentTransactions,
  StatsCard,
  WalletBalance,
} from "components/Dashboard";
import { navStates, useNavContext } from "context/NavProvider";

import Head from "next/head";
import { useEffect, useState } from "react";

const Home = () => {
  const { setActiveNav } = useNavContext();
  const [stats, setStats] = useState({});

  useEffect(() => {
    setActiveNav(navStates?.dashboard);
  }, [setActiveNav, navStates]);

  const { data: overallStatsResp } = useGetOverallStats();

  useEffect(() => {
    if (!!overallStatsResp && overallStatsResp?.data?.length > 0) {
      setStats(overallStatsResp?.data[0]);
    }
  }, [overallStatsResp]);

  return (
    <div>
      <Head>
        <title>Kumo Africa Admin v2</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box minH="80vh" px="24px">
        <Flex gap="5" mb="28px" flexWrap="wrap">
          {Object?.keys(stats)?.length > 0 &&
            Object?.values(stats)?.map((stat, i) => (
              <StatsCard key={i} stats={stat} />
            ))}
        </Flex>
        <Grid templateColumns={["repeat(2, 1fr)"]} gap="6">
          <GridItem colSpan={1}>
            <WalletBalance />
            <QuickActions />
            <RecentTransactions />
          </GridItem>
          <GridItem colSpan={1}>
            <DashboardTransactions />
            <PayWithKumo />
          </GridItem>
        </Grid>
      </Box>
    </div>
  );
};

export default Home;

Home.requireAuth = true;
