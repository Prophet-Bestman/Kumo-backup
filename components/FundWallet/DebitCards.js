import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import AddCard from "./AddCard";
import ConfirmCard from "./ConfirmCard";

const DebitCards = ({ completeTransaction }) => {
  const [step, setStep] = useState(1);

  return (
    <Box bg="white" px="6" py="9" rounded="md">
      {step === 1 && (
        <AddCard setStep={setStep} completeTransaction={completeTransaction} />
      )}
      {step === 2 && <ConfirmCard setStep={setStep} />}
    </Box>
  );
};

export default DebitCards;
