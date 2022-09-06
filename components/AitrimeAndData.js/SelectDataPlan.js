import {
  Box,
  Button,
  Grid,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const SelectDataPlan = ({ setShowConfirm }) => {
  return (
    <Box p="6" rounded="md" bg="white">
      <Text mb="3" fontWeight={700} fontSize="20px">
        Select Coin
      </Text>
      <Text fontSize="12px">Include where you are sending the money to</Text>

      <Grid mt="8" rowGap="4">
        <Stack>
          <Text fontSize="11px">Enter Phone Number</Text>
          <Input placeholder="0801 234 5678" />
        </Stack>
        <Stack>
          <Text fontSize="11px">Select Network</Text>
          <Select placeholder="Select Network">
            <option value="airtel">Airtel</option>
            <option value="glo">Glo</option>
            <option value="MTN">MTN</option>
            <option value="9mobile">9mobile</option>
          </Select>
        </Stack>
        <Stack>
          <Text fontSize="11px">Select Data Plan</Text>
          <Select placeholder="Select Data Plan">
            <option value="100MB - N100">100MB - N100</option>
            <option value="500MB - N200">500MB - N200</option>
            <option value="1.5GB N1000">1.5GB N1000</option>
            <option value="6GB - N200">6GB - N2000</option>
          </Select>
        </Stack>
      </Grid>

      <Button onClick={() => setShowConfirm(true)} mt="12">
        Proceed
      </Button>
    </Box>
  );
};

export default SelectDataPlan;
