import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { ActionOptions } from "components";
import { BillsOptions, BuyWaecCard, ConfirmPayment } from "components/PayBills";
import React, { useState } from "react";

const PayBills = () => {
  const [option, setOption] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const options = {
    sms: "Send SMS",
    waec: "Buy WAEC Scratch Card",
    bettings: "Bettings",
    tv: "Cable TV",
  };

  return (
    <Box p="6">
      <Grid templateColumns={"repeat(3, 1fr)"} gap="4">
        <GridItem>
          <ActionOptions
            title="Make purchase"
            subtitle="Select purchase  you want to make"
            options={options}
            setOption={setOption}
          />
        </GridItem>

        <GridItem>
          {option === options?.waec && (
            <BuyWaecCard setShowConfirm={setShowConfirm} />
          )}
        </GridItem>

        <GridItem>{showConfirm && <ConfirmPayment />}</GridItem>
      </Grid>
    </Box>
  );
};

export default PayBills;
