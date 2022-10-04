import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  useGetAllLogger,
  useGetAllLoggerSize,
  useGetSingleLogger,
} from "api/logger";
import { ActionOptions, Pagination } from "components";
import { LogTable } from "components/Logs";
import { BuyWaecCard, ConfirmPayment } from "components/PayBills";
import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect, useState } from "react";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const { setActiveNav } = useNavContext();
  useEffect(() => {
    setActiveNav(navStates?.logs);
  }, []);

  const { data: logsResp, isLoading, refetch } = useGetAllLogger(page);

  useEffect(() => {
    if (!!logsResp && logsResp?.status === "success") {
      setLogs(logsResp?.data);
    }
  }, [logsResp]);

  //  ============= PAGINATION LOGIC ===============
  const { data: countResp } = useGetAllLoggerSize();

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
      <LogTable logs={logs} isLoading={isLoading} />
      <Pagination page={page} pages={pages} setPage={setPage} />
    </Box>
  );
};

export default Logs;

Logs.requireAuth = true;
