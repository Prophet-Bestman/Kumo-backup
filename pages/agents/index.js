import { Box, useDisclosure } from "@chakra-ui/react";
import { useGetAgents } from "api/agents";
import { FloatingAddBtn } from "components";
import { AddAgent, AgentsTable } from "components/Agents";

import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect, useState } from "react";

const AgentsPage = () => {
  const { setActiveNav } = useNavContext();
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    setActiveNav(navStates?.agents);
  }, []);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data: agentsResp, isLoading } = useGetAgents();

  useEffect(() => {
    if (!!agentsResp && agentsResp?.status === "success") {
      setAgents(agentsResp?.data);
    }
  }, [agentsResp]);

  return (
    <Box p="6">
      <AgentsTable agents={agents} isLoading={isLoading} />
      <FloatingAddBtn onClick={onOpen} />
      {isOpen && <AddAgent isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
};

export default AgentsPage;

AgentsPage.requireAuth = true;
