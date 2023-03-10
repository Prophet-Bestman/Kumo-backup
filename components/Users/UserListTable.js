import { Box, Tag } from "@chakra-ui/react";
import { Button, Table } from "antd";
import Link from "next/link";
import React from "react";
import {
  cryptoNumberWithCommas,
  getStatusColor,
  getWalletBalanceFromUser,
  numberWithCommas,
} from "utils/helpers";

const UserListTable = ({ users, isLoading, wallets }) => {
  const columns = [
    {
      title: "Index",
      key: "index",
      render: (value, item, index) => 1 + index,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      sorter: {
        compare: (a, b) => a?.first_name.localeCompare(b?.first_name),
        multiple: 3,
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      sorter: {
        compare: (a, b) => a?.last_name.localeCompare(b?.last_name),
        multiple: 3,
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
        multiple: 3,
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      sorter: (a, b) => a.phone_number.length - b.phone_number.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "KYC Verification",
      dataIndex: "bvn",
      render: (bvn) => (
        <Tag
          w="100px"
          textAlign="center"
          color={getStatusColor(bvn?.admin_reply)}
          justifyContent="center"
          textTransform="capitalize"
        >
          {bvn?.admin_reply}
        </Tag>
      ),
      filters: [
        {
          text: "Unverified",
          value: "unverified",
        },
        {
          text: "Verified",
          value: "verified",
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
      onFilter: (value, record) => record.bvn?.admin_reply === value,
    },
    {
      title: "Verification Status",
      dataIndex: "is_verified",
      render: (status) => (
        <Tag
          w="100px"
          textAlign="center"
          colorScheme={status ? "green" : "red"}
          justifyContent="center"
        >
          {status ? "Verified" : "Unverified"}
        </Tag>
      ),
      filters: [
        {
          text: "Unverified",
          value: false,
        },
        {
          text: "Verified",
          value: true,
        },
      ],
      onFilter: (value, record) => record.is_verified === value,
    },
    {
      title: "Frozen Status",
      dataIndex: "froozen",
      render: (status) => (
        <Tag
          w="100px"
          textAlign="center"
          colorScheme={status ? "red" : "green"}
          justifyContent="center"
        >
          {status ? "Frozen" : "Not Frozen"}
        </Tag>
      ),
      filters: [
        {
          text: "Not Frozen",
          value: false,
        },
        {
          text: "Frozen",
          value: true,
        },
      ],
      onFilter: (value, record) => record.froozen === value,
    },

    {
      title: "Base Currency Name",
      dataIndex: "current_base_currency",
      render: (_, user) => (
        <Box textTransform="capitalize">
          {user?.current_base_currency?.name}
        </Box>
      ),
      sorter: {
        compare: (a, b) =>
          a?.current_base_currency?.name.localeCompare(
            b?.current_base_currency?.name
          ),
        multiple: 3,
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Base Currency",
      dataIndex: "current_base_currency",

      render: (_, user) => {
        // console.log(user);
        return (
          <Box>
            {user?.current_base_currency?.symbol}
            {numberWithCommas(
              getWalletBalanceFromUser(user, user?.current_base_currency?.name)
            )}
          </Box>
        );
      },
      sorter: {
        compare: (a, b) =>
          getWalletBalanceFromUser(a, a?.current_base_currency?.name) -
          getWalletBalanceFromUser(b, a?.current_base_currency?.name),
        multiple: 3,
      },
      sortDirections: ["descend", "ascend"],
    },

    ...wallets?.map((wallet) => {
      return {
        title: wallet.name?.toUpperCase(),
        dataIndex: wallet.code,
        render: (_, user) => (
          <Box>
            {cryptoNumberWithCommas(
              getWalletBalanceFromUser(user, wallet?.name)
            )}
          </Box>
        ),
        sorter: {
          compare: (a, b) =>
            getWalletBalanceFromUser(a, wallet?.name) -
            getWalletBalanceFromUser(b, wallet?.name),
          multiple: 3,
        },
        sortDirections: ["descend", "ascend"],
      };
    }),
    {
      title: "Action",
      dataIndex: "_id",
      render: (_id) => (
        <Link href={`/users/${_id}`}>
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
        dataSource={users}
        columns={columns}
        loading={isLoading}
        scroll={{ x: "100vw" }}
      />
    </Box>
  );
};

export default UserListTable;
