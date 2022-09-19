import {
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
  const { dispatch: logout } = useAuthContext();

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
    <Box>
      <Flex
        px="42px"
        py="32px"
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
          Adewale Adedamola
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
            <Img
              src="img/Profile_Picture.jpeg"
              width="48px"
              rounded="md"
              h="48px"
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
      {activeNav !== "Dashboard" && (
        <Flex my="6" px="12" alignItems="center" gap="4">
          <Box color="app.primary.900">
            <AiOutlineArrowLeft
              onClick={() => router?.back()}
              cursor="pointer"
              size="24px"
            />
          </Box>

          {activeNav}
        </Flex>
      )}
    </Box>
  );
};

export default Topbar;
