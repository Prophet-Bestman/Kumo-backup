import { Box, Grid } from "@chakra-ui/react";
import { MoreInfo, ProfileCard, ProfileInfo } from "components/profile";
import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect } from "react";

const AccountSettings = () => {
  const { setActiveNav } = useNavContext();

  useEffect(() => {
    setActiveNav(navStates?.account);
  }, [navStates, setActiveNav]);

  return (
    <Box p="6">
      <Grid templateColumns="repeat(3, 1fr)" gap="4">
        <ProfileCard />
        <ProfileInfo />
        <MoreInfo />
      </Grid>
    </Box>
  );
};

export default AccountSettings;

AccountSettings.requireAuth = true;
