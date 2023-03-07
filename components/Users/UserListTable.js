import { Box, Tag } from "@chakra-ui/react";
import { Table } from "antd";
import React from "react";
import { getStatusColor } from "utils/helpers";

const UserListTable = ({ users, isLoading }) => {
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
      title: "Admin Reply",
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
      filter: [
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
      onFilter: (value, record) => record.bvn?.admin_reply.indexOf(value) === 0,
    },
    {
      title: "Verification Status",
      dataIndex: "is_verified",
      render: (status) => {
        return (
          <Tag
            w="100px"
            textAlign="center"
            colorScheme={status ? "green" : "red"}
            justifyContent="center"
          >
            {status ? "Verified" : "Unverified"}
          </Tag>
        );
      },
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
        dataSource={users}
        columns={columns}
        loading={isLoading}
      />
    </Box>
  );
};

export default UserListTable;
