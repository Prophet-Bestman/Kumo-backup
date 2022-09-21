import { Box } from "@chakra-ui/react";
import { useGetUsers } from "api/users";
import { UsersTable } from "components/Users";
import { navStates, useNavContext } from "context/NavProvider";
import React, { useEffect, useState } from "react";

const Users = () => {
  const { setActiveNav } = useNavContext();
  useEffect(() => {
    setActiveNav(navStates?.users);
  }, []);

  const [users, setUsers] = useState();

  const { data: usersResp, isLoading } = useGetUsers();

  useEffect(() => {
    if (!!usersResp && usersResp?.status === "success") {
      setUsers(usersResp?.data);
    }
  }, [usersResp]);

  return (
    <Box p="6">
      <UsersTable users={users} isLoading={isLoading} />
    </Box>
  );
};

export default Users;

Users.requireAuth = true;
