import { Avatar, Flex, Grid, GridItem, Text, useToast } from "@chakra-ui/react";
import React, { useRef } from "react";
import { FaCopy } from "react-icons/fa";

const UserInfo = ({ user }) => {
  const {
    first_name,
    image_url,
    is_verified,
    language,
    bvn,
    last_name,
    phone_number,
    email,
    two_factor_verification,
    referral_id,
    phone_number_verified,
    _id,
  } = user;

  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Copied",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    });
  };

  const userIdRef = useRef(null);
  const referralIdRef = useRef(null);

  function copyUserId() {
    userIdRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    successToast();
  }

  function copyReferralId(_id) {
    referralIdRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    successToast();
  }

  return (
    <Flex
      flexDir="column"
      bg="white"
      px="6"
      py="12"
      rounded="md"
      alignItems="center"
      boxShadow="sm"
    >
      <Text alignItems="center" fontSize="20px" mb="6" fontWeight={600}>
        User Info
      </Text>

      <Avatar name={`${first_name} ${last_name}`} size="2xl" src={image_url} />

      <Text my="4" color="app.primary.900" fontWeight={700}>
        {first_name} {last_name}
      </Text>

      <Grid gap="2" justifyContent="center" w="full" textAlign="center">
        <Text fontWeight="500" fontSize="12px">
          {email}
        </Text>
        <Text fontWeight="500" fontSize="12px">
          {phone_number}
        </Text>

        <Flex
          aignItems="center"
          gap="2"
          justify="center"
          cursor="pointer"
          onClick={copyUserId}
        >
          <Text fontWeight="500" fontSize="12px">
            User ID: {_id}
          </Text>
          {/* <Flex aignItems="center" gap="1" color="app.primary.300">
            <FaCopy />
            <Text fontSize="12px">Copy</Text>
          </Flex> */}
        </Flex>

        <Flex
          aignItems="center"
          gap="2"
          justify="center"
          cursor="pointer"
          onClick={copyReferralId}
        >
          <Text fontWeight="500" fontSize="12px">
            Referal ID: {referral_id || "Nil"}
          </Text>
          {/* <Flex aignItems="center" gap="1" color="app.primary.300">
            <FaCopy />
            <Text fontSize="12px">Copy</Text>
          </Flex> */}
        </Flex>
      </Grid>

      <Grid fontSize="14px" mt="12" w="full" templateColumns={"repeat(2, 1fr)"}>
        <GridItem fontWeight="600">Language:</GridItem>
        <GridItem>{language || "Nil"} </GridItem>

        <GridItem fontWeight="600">Account Verification:</GridItem>
        <GridItem>
          <Text fontWeight="600" color={is_verified ? "green" : "red"}>
            {is_verified ? "Verified" : "Unverified"}
          </Text>
        </GridItem>

        <GridItem fontWeight="600">BVN:</GridItem>
        <GridItem>{bvn?.bvn_number || "Nil"} </GridItem>

        <GridItem fontWeight="600">BVN Verification:</GridItem>
        <GridItem>
          <Text fontWeight="600" color={bvn?.verified ? "green" : "red"}>
            {bvn?.verified ? "Verified" : "Unverified"}
          </Text>
        </GridItem>

        <GridItem fontWeight="600">Phone No. Verification:</GridItem>
        <GridItem>
          <Text
            fontWeight="600"
            color={phone_number_verified ? "green" : "red"}
          >
            {phone_number_verified ? "Verified" : "Unverified"}
          </Text>
        </GridItem>

        <GridItem fontWeight="600">Two-Factor Verification:</GridItem>
        <GridItem>
          <Text
            fontWeight="600"
            color={two_factor_verification ? "green" : "red"}
          >
            {two_factor_verification ? "Verified" : "Unverified"}
          </Text>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default UserInfo;
