import { Box, useDisclosure } from "@chakra-ui/react";
import { useGetAgents, useGetAgentsSize } from "api/agents";
import { FloatingAddBtn, Pagination } from "components";
import { AddAgent, AgentsTable } from "components/Agents";

import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect, useState } from "react";

const AgentsPage = () => {
  const { setActiveNav } = useNavContext();
  const [agents, setAgents] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setActiveNav(navStates?.agents);
  }, []);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data: agentsResp, isLoading, refetch } = useGetAgents(page);

  useEffect(() => {
    if (!!agentsResp && agentsResp?.status === "success") {
      setAgents(agentsResp?.data);
    }
  }, [agentsResp]);

  //  ============= PAGINATION LOGIC ===============
  const { data: countResp } = useGetAgentsSize();

  useEffect(() => {
    if (!!countResp && countResp?.status === "success") {
      setPages(Math.ceil(countResp?.data?.total / 20));
    }
  }, [countResp]);

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <Box p="6">
      <AgentsTable agents={agents} isLoading={isLoading} />
      <Pagination page={page} pages={pages} setPage={setPage} />
      <FloatingAddBtn onClick={onOpen} />
      {isOpen && <AddAgent isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
};

export default AgentsPage;

AgentsPage.requireAuth = true;
