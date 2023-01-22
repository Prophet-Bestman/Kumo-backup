import { Box, Grid, Text } from "@chakra-ui/react";

import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const UserCards = () => {
  return (
    <Grid rowGap="8" p="6" py="12" rounded="md" bg="white">
      <Text textAlign="center" fontSize="20px" fontWeight={600}>
        Cards
      </Text>
      <Box cursor="pointer">
        <Cards
          cvc={"321"}
          expiry={"12/22"}
          locale={{ valid: "Expires" }}
          preview={false}
          name={"Andrew Perts"}
          number={"5018********5283"}
        />
      </Box>

      <Box cursor="pointer">
        <Cards
          cvc={"321"}
          expiry={"12/22"}
          locale={{ valid: "Expires" }}
          preview={false}
          name={"Chris Davis"}
          number={"4441********5283"}
        />
      </Box>
    </Grid>
  );
};

export default UserCards;
