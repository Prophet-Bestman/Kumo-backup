import { Box } from "@chakra-ui/react";
import { Button, Table } from "antd";
import Link from "next/link";
import React from "react";
import { cryptoNumberWithCommas } from "utils/helpers";

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
      render: (from, transaction) => (
        <Box>{transaction?.type?.includes("BUY") ? "KUMO" : from}</Box>
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
      render: (to, transaction) => (
        <Box>{transaction?.type?.includes("SELL") ? "KUMO" : to}</Box>
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

    {
      title: "Amount Paid",
      dataIndex: "amount_paid",
      render: (amount_paid, transaction) => (
        <Box fontSize={"13px"}>
          <strong> {transaction?.currency?.code}</strong>{" "}
          {cryptoNumberWithCommas(amount_paid)}
        </Box>
      ),
      sorter: {
        compare: (a, b) => a?.amount_paid - b?.amount_paid,
        multiple: 3,
      },
      sortDirections: ["descend", "ascend"],
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
