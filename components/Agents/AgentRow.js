import { Button, Tag, Td, Tr, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import UpdateAgent from "./UpdateAgent";

const AgentRow = ({ agent }) => {
  const {
    agent_name,
    account_name,
    account_number,
    agent_email,
    agent_phone,
    bank_name,
  } = agent;

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    //   <TransactionRow  transaction={transaction} />
    <Tr key={agent?._id}>
      <Td>{agent_name}</Td>
      <Td>{agent_email}</Td>
      <Td>{agent_phone}</Td>
      <Td>{account_name}</Td>
      <Td>{account_number}</Td>
      <Td>{bank_name}</Td>

      <Td>
        <Button size="sm" h="32px" onClick={onOpen}>
          View
        </Button>
      </Td>
      {isOpen && (
        <UpdateAgent agent={agent} isOpen={isOpen} onClose={onClose} />
      )}
    </Tr>
  );
};

export default AgentRow;
