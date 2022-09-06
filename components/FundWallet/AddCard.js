import {
  Box,
  Flex,
  Grid,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CardInputStyles from "./CardInput.module.css";

import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Cleave from "cleave.js/react";
import { SlideFade } from "@chakra-ui/react";

const AddCard = ({ setStep, completeTransaction }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Text mb="3" fontWeight={700} fontSize="20px">
        Debit Card
      </Text>
      <Text fontSize="11px" mb="9" w="85%">
        Select the wallet you want to fund and type much would you like to fund
        your wallet?
      </Text>
      <Flex flexDir="column" gap="6">
        <Box onClick={completeTransaction} cursor="pointer">
          <Cards
            cvc={"321"}
            expiry={"12/22"}
            locale={{ valid: "Expires" }}
            preview={false}
            name={"Andrew Perts"}
            number={"5018********5283"}
          />
        </Box>

        <Box onClick={completeTransaction} cursor="pointer">
          <Cards
            cvc={"321"}
            expiry={"12/22"}
            locale={{ valid: "Expires" }}
            preview={false}
            name={"Chris Davis"}
            number={"4441********5283"}
          />
        </Box>
      </Flex>
      <Text
        mt="2"
        cursor="pointer"
        textAlign="center"
        fontWeight="bold"
        color="app.primary.900"
        onClick={onToggle}
      >
        + Add Card
      </Text>
      <SlideFade in={isOpen} delay="400ms">
        {isOpen && (
          <Box>
            <Box>
              <Grid templateColumns="" rowGap={4} py="3">
                <Stack>
                  <Text fontSize="12px" fontWeight={500} mb="2">
                    Card Number
                  </Text>
                  <Cleave
                    className={CardInputStyles.card_number}
                    type="tel "
                    options={{ creditCard: true }}
                  />
                </Stack>
                <Stack>
                  <Text fontSize="12px" fontWeight={500} mb="2">
                    {`Holder’s Name`}
                  </Text>
                  <Input variant="filled" />
                </Stack>
                <Stack>
                  <Text fontSize="12px" fontWeight={500} mb="2">
                    Expire Date (DD/MM)
                  </Text>
                  <Cleave
                    className={CardInputStyles.card_number}
                    options={{ date: true, datePattern: ["m", "y"] }}
                  />
                </Stack>
                <Stack>
                  <Text fontSize="12px" fontWeight={500} mb="2">
                    CCV (3 digits behind your card)
                  </Text>
                  <Input type="password" maxLength={3} />
                </Stack>
              </Grid>
            </Box>

            <Text
              mt="2"
              cursor="pointer"
              textAlign="center"
              fontWeight="bold"
              color="app.primary.900"
              onClick={() => setStep(2)}
            >
              + Save this card
            </Text>
          </Box>
        )}
      </SlideFade>
    </Box>
  );
};

export default AddCard;
