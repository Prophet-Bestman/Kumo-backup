import {
  Avatar,
  Box,
  Button,
  Circle,
  Flex,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useAuthContext, userActions } from "context/AuthProvider";
import { useNavContext } from "context/NavProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiDownArrow } from "react-icons/bi";
import { MdNotifications } from "react-icons/md";

const Topbar = () => {
  const { activeNav } = useNavContext();
  const router = useRouter();
  const { user, dispatch: logout } = useAuthContext();

  const menuList = [
    { name: "Profile Settings", link: "/profile" },
    { name: "Find Helps", link: "#" },
    { name: "About Us", link: "#" },
  ];

  const handleLogout = () => {
    logout({ type: userActions.LOGOUT });
    router.push("/auth/login");
  };

  return (
    <Flex py="32px" justify="space-between" alignItems="center">
      {activeNav !== "Dashboard" && (
        <Flex my="6" px="12" alignItems="center" gap="4">
          <Box color="app.primary.900">
            <AiOutlineArrowLeft
              onClick={() => router?.back()}
              cursor="pointer"
              size="24px"
            />
          </Box>

          <Text fontSize="18px" fontWeight="500" color="app.primary.500">
            {activeNav}
          </Text>
        </Flex>
      )}
      <Flex
        px="42px"
        ml="auto"
        justify="end"
        alignItems="center"
        color="app.primary.900"
        gap="24px"
      >
        <Box pos="relative">
          <Circle
            size="12px"
            borderColor="white"
            borderWidth="2px"
            pos="absolute"
            top="3px"
            right="3px"
            bg="app.primary.900"
          />
          <MdNotifications size="30px" />
        </Box>

        <Text fontSize="12px" fontWeight={700}>
          {user?.first_name} {user?.last_name}
        </Text>

        <Menu>
          <MenuButton
            p="0"
            as={Button}
            rightIcon={<BiDownArrow />}
            width="80px"
            bg="transparent"
            color="app.primary.900"
            _hover={{
              bg: "transparent",
            }}
          >
            <Avatar
              name={`${user?.first_name} ${user?.last_name}`}
              rounded="lg"
              src={user?.image_url}
            />
          </MenuButton>
          <MenuList px="5" py="4">
            {menuList?.map((item, i) => (
              <MenuItem
                py="3"
                key={i}
                borderBottom="2px"
                borderColor="#C4C4C4"
                fontWeight={600}
                w="full"
              >
                <Link href={item.link}>
                  <Text textAlign="end">{item.name}</Text>
                </Link>
              </MenuItem>
            ))}
            <MenuItem
              py="3"
              borderBottom="2px"
              borderColor="#C4C4C4"
              fontWeight={600}
              w="full"
              onClick={handleLogout}
            >
              <Text textAlign="end">Logout</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Topbar;
