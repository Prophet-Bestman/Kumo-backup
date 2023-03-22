import { Box } from "@chakra-ui/react";
import { Button, Table } from "antd";
import Link from "next/link";
import React from "react";
import { cryptoNumberWithCommas, numberWithCommas } from "utils/helpers";

const TransactionHistoryTable = ({ transactions, isLoading, wallets }) => {
  const columns = [
    {
      title: "Index",
      key: "index",
      render: (value, item, index) => 1 + index,
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
    },
    {
      title: "Mode",
      key: "mode",
      dataIndex: "mode",
      filters: [
        {
          text: "Debit",
          value: "DEBIT",
        },
        {
          text: "Credit",
          value: "CREDIT",
        },
      ],
      onFilter: (value, transaction) => transaction.mode === value,
    },
    {
      title: "From",
      dataIndex: "from",
      render: (from) => (
        // <Box>{transaction?.type?.includes("BUY") ? "KUMO" : from}</Box>
        <Box>{from}</Box>
      ),
      sorter: {
        compare: (a, b) => a?.from.localeCompare(b?.from),
        multiple: 3,
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "To",
      dataIndex: "to",
      render: (to) => (
        // <Box>{transaction?.type?.includes("SELL") ? "KUMO" : to}</Box>
        <Box>{to}</Box>
      ),
      sorter: {
        compare: (a, b) => a?.to.localeCompare(b?.to),
        multiple: 3,
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Currency",
      dataIndex: "currency",
      //   key: "currency",
      render: (currency) => <Box>{currency?.name}</Box>,
      filters: [
        ...wallets.map((wallet) => {
          return {
            text: wallet.name,
            value: wallet.name,
          };
        }),
        // {
        //   text: "Not Frozen",
        //   value: false,
        // },
        // {
        //   text: "Frozen",
        //   value: true,
        // },
      ],
      onFilter: (value, transaction) =>
        transaction.currency.toLowerCase() === value.toLowerCase(),
    },

    // {
    //   title: "Amount Paid",
    //   dataIndex: "amount_paid",
    //   render: (amount_paid, transaction) => (
    //     <Box fontSize={"13px"}>
    //       <strong> {transaction?.currency?.code}</strong>{" "}
    //       {transaction?.base_currency?.name === transaction?.currency?.name
    //         ? numberWithCommas(amount_paid)
    //         : cryptoNumberWithCommas(transaction.amount_to_fund_in_currency)}
    //     </Box>
    //   ),
    //   sorter: {
    //     compare: (a, b) => a?.amount_paid - b?.amount_paid,
    //     multiple: 3,
    //   },
    //   sortDirections: ["descend", "ascend"],
    // },
    // {
    //   title: "Amount Paid",
    //   dataIndex: "amount_paid",
    //   render: (amount_paid, transaction) => (
    //     <Box fontSize={"13px"}>
    //       <strong> {transaction?.currency?.code}</strong>{" "}
    //       {transaction?.base_currency?.name === transaction?.currency?.name
    //         ? numberWithCommas(amount_paid)
    //         : cryptoNumberWithCommas(transaction.amount_to_fund_in_currency)}
    //     </Box>
    //   ),
    //   sorter: {
    //     compare: (a, b) => a?.amount_paid - b?.amount_paid,
    //     multiple: 3,
    //   },
    //   sortDirections: ["descend", "ascend"],
    // },
    {
      title: "Amount Received in Base Currency",
      dataIndex: "amount_in_base_currency",
      render: (amount_in_base_currency, transaction) => (
        <Box fontSize={"13px"} w="250px">
          <strong> {transaction?.base_currency?.symbol}</strong>{" "}
          {numberWithCommas(amount_in_base_currency)}
        </Box>
      ),
      sorter: {
        compare: (a, b) =>
          a?.amount_in_base_currency - b?.amount_in_base_currency,
        multiple: 3,
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Amount Paid in Base Currency",
      dataIndex: "amount_paid_in_base_currency",
      render: (amount_paid_in_base_currency, transaction) => (
        <Box fontSize={"13px"} w="250px">
          <strong> {transaction?.base_currency?.symbol}</strong>{" "}
          {numberWithCommas(amount_paid_in_base_currency)}
        </Box>
      ),
      sorter: {
        compare: (a, b) =>
          a?.amount_paid_in_base_currency - b?.amount_paid_in_base_currency,
        multiple: 3,
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Amount Paid in Coin/Token",
      dataIndex: "amount_in_crypto",
      render: (amount_in_crypto, transaction) => (
        <Box fontSize={"13px"} w="250px">
          <strong> {transaction?.currency?.code}</strong>{" "}
          {cryptoNumberWithCommas(amount_in_crypto)}
        </Box>
      ),
      sorter: {
        compare: (a, b) => a?.amount_in_crypto - b?.amount_in_crypto,
        multiple: 3,
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Transaction Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Fulfilled",
          value: "fulfilled",
        },
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Failed",
          value: "failed",
        },
      ],
      onFilter: (value, transaction) => transaction.status === value,
    },
    {
      title: "Date",
      dataIndex: "created_at",
      render: (created_at) => (
        <Box fontSize={"13px"} textTransform="capitalize">
          {new Date(created_at).toDateString()},{" "}
          {new Date(created_at).toLocaleTimeString()}
        </Box>
      ),
      sorter: {
        compare: (a, b) => new Date(a?.created_at) - new Date(b?.created_at),
        multiple: 3,
      },
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Action",
      dataIndex: "_id",
      render: (_id) => (
        <Link href={`/transactions/${_id}`}>
          <Button size="sm" variant="link">
            View
          </Button>
        </Link>
      ),
    },
  ];
  return (
    <Box>
      <Table
        // pagination={{
        //   onChange: (page) => {
        //     setPage(page);
        //   },
        //   current: Number.parseInt(metaData.currentPage),
        //   total: metaData.totalNumberOfItems,
        //   pageSize: metaData.pageLimit,
        // }}

        pagination={false}
        dataSource={transactions}
        columns={columns}
        loading={isLoading}
        scroll={{ x: "100vw" }}
      />
    </Box>
  );
};

export default TransactionHistoryTable;
