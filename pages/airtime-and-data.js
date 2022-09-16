import { Box, Grid, GridItem } from "@chakra-ui/react";
import { ActionOptions } from "components";
import {
  SelectAirtimeAmount,
  SelectDataPlan,
} from "components/AitrimeAndData.js";
import { ConfirmPayment } from "components/PayBills";
import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect, useState } from "react";

const AirtimeAndData = () => {
  const { setActiveNav } = useNavContext();
  useEffect(() => {
    setActiveNav(navStates?.airtime_and_data);
  }, []);

  const [option, setOption] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const options = {
    airtime: "Buy Airtime",
    data: "Buy Data",
  };
  return (
    <Box p="6">
      <Grid templateColumns="repeat(3, 1fr)" gap="4">
        <GridItem>
          <ActionOptions
            options={options}
            option={option}
            setOption={setOption}
            title={"Make purchase"}
            subtitle="Select purchase  you want to make"
            onChange={() => setShowConfirm(false)}
          />
        </GridItem>
        {option === options.airtime && (
          <>
            <GridItem>
              <SelectAirtimeAmount setShowConfirm={setShowConfirm} />
            </GridItem>
            <GridItem>{showConfirm && <ConfirmPayment />}</GridItem>
          </>
        )}
        {option === options.data && (
          <>
            <GridItem>
              <SelectDataPlan setShowConfirm={setShowConfirm} />
            </GridItem>
            <GridItem>{showConfirm && <ConfirmPayment />}</GridItem>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default AirtimeAndData;

AirtimeAndData.requireAuth = true;
