import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useNavContext } from "context/NavProvider";
import Link from "next/link";
import React from "react";
import { navs } from "utils/links";
import { navWidthStates } from "./MainLayout";

const SideNav = ({ stretch, shrink, navWidth }) => {
  const { activeNav: active } = useNavContext();

  return (
    <Box py="10">
      <Box
        pl={navWidth === navWidthStates?.stretched ? "30px" : "28px"}
        mb="14"
      >
        {navWidth === navWidthStates?.stretched ? (
          <Image src="/img/logo_full.png" />
        ) : (
          <Image src="/img/logo_small.png" />
        )}
      </Box>
      <Box color="white">
        {navWidth === navWidthStates?.stretched ? (
          <Box cursor={"pointer"} pl="28px" onClick={shrink} py="20px">
            <Box rounded="full" w="18px" h="3px" bg="white"></Box>
            <Box my="1" rounded="full" w="9px" h="3px" bg="white"></Box>
          </Box>
        ) : (
          <Box cursor={"pointer"} pl="28px" onClick={stretch} py="20px">
            <Box rounded="full" w="18px" h="3px" bg="white"></Box>
            <Box my="1" rounded="full" w="18px" h="3px" bg="white"></Box>
          </Box>
        )}
        {navs?.length > 0 &&
          navs?.map((nav, i) => (
            <Link href={nav.link} key={nav.link}>
              <Flex
                gap="14px"
                py="4"
                pl="28px"
                alignItems="center"
                my="3"
                key={i}
                bg={active === nav.name && "app.primary.500"}
                _hover={{
                  bg: "app.primary.500",
                }}
                cursor="pointer"
              >
                {nav.icon}
                {navWidth === navWidthStates?.stretched && (
                  <Text
                    transition="400ms all ease-in-out"
                    fontSize="11px"
                    fontWeight="400"
                  >
                    {nav.name}
                  </Text>
                )}
              </Flex>
            </Link>
          ))}
      </Box>
    </Box>
  );
};

export default SideNav;
