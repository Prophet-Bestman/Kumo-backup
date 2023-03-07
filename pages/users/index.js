import { Box, Flex, Tag, Text } from "@chakra-ui/react";
import { useGetAllCoinListing, useGetCryptoTokens } from "api/settings";
import { useGetUsers, useGetUsersSize } from "api/users";
import { Pagination } from "components";
import UserListTable from "components/Users/UserListTable";
import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

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
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState(filterList);
  const [filterObjs, setFilterObjs] = useState([]);
  const [wallets, setWallets] = useState([]);

  const { data: tokensResp, isLoading: loadingCrypto } = useGetCryptoTokens();
  const { data: coinsResp, isLoading: loadingCoins } = useGetAllCoinListing();

  useEffect(() => {
    if (!!tokensResp && tokensResp?.status === "success") {
      setWallets([...wallets, ...tokensResp?.data]);
    }
    if (!!coinsResp && coinsResp?.status === "success") {
      setWallets([...wallets, ...coinsResp?.data]);
    }
  }, [tokensResp, coinsResp]);

  const { data: usersResp, isLoading } = useGetUsers(page);

  //  ============= PAGINATION LOGIC ===============
  const { data: countResp, refetch } = useGetUsersSize();

  useEffect(() => {
    if (!!countResp && countResp?.status === "success") {
      setPages(Math.ceil(countResp?.data?.total / 20));
    }
  }, [countResp]);

  useEffect(() => {
    refetch();
  }, [page]);

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
      {/* <Flex justify="space-between" alignItems="center" mb="8">
        <InputGroup maxW="350px">
          <InputLeftElement>
            <BsSearch />
          </InputLeftElement>
          <Input placeholder="Search by order, name, number, email..." />
        </InputGroup>

        <FilterMenu
          filterObjs={filterObjs}
          setFilterObjs={setFilterObjs}
          filters={filters}
          setFilters={setFilters}
        />
      </Flex> */}
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

      {wallets && (
        <UserListTable
          users={users}
          isLoading={isLoading || loadingCrypto || loadingCoins}
          wallets={wallets}
        />
      )}

      <Pagination page={page} pages={pages} setPage={setPage} />
    </Box>
  );
};

export default Users;

Users.requireAuth = true;
