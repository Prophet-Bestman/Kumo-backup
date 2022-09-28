import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useGetUsers } from "api/users";
import { FilterMenu } from "components";
import { UsersTable } from "components/Users";
import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

const filterList = [
  {
    name: "email",
    conjuctions: [
      { name: "Contains", value: "contains" },
      { name: "Doesn't Contain", value: "does-not-contain" },
    ],
  },
];

const Users = () => {
  const { setActiveNav } = useNavContext();
  const [users, setUsers] = useState();
  const [filters, setFilters] = useState(filterList);
  const [filterObjs, setFilterObjs] = useState([]);

  const { data: usersResp, isLoading } = useGetUsers();

  useEffect(() => {
    setActiveNav(navStates?.users);
  }, []);

  useEffect(() => {
    if (!!usersResp && usersResp?.status === "success") {
      setUsers(usersResp?.data);
    }
  }, [usersResp]);

  const handleRemoveFilter = (filter) => {
    let filtersCopy = filterObjs;

    if (filtersCopy?.length > 0) {
      filtersCopy = filtersCopy?.filter((item) => item?.name !== filter?.name);
      setFilterObjs(filtersCopy);
      setFilters([...filters, filter]);
    }
  };

  return (
    <Box p="6">
      <Flex justify="space-between" alignItems="center" mb="8">
        <InputGroup maxW="350px">
          <InputLeftElement children={<BsSearch />} />
          <Input placeholder="Search by order, name, number, email..." />
        </InputGroup>

        <FilterMenu
          filterObjs={filterObjs}
          setFilterObjs={setFilterObjs}
          filters={filters}
          setFilters={setFilters}
        />
      </Flex>
      <Flex mb="6">
        {filterObjs?.length > 0 &&
          filterObjs?.map((filter, i) => (
            <Tag display="flex" gap="1" key={i}>
              <Text fontWeight="600" textTransform="capitalize">
                {filter?.name}
              </Text>
              {"  "} {filter?.conjunction?.name}{" "}
              <strong>{filter?.value}</strong>
              <AiOutlineClose
                cursor="pointer"
                onClick={() => {
                  handleRemoveFilter(filter);
                }}
              />
            </Tag>
          ))}
      </Flex>
      <UsersTable users={users} isLoading={isLoading} />
    </Box>
  );
};

export default Users;

Users.requireAuth = true;
