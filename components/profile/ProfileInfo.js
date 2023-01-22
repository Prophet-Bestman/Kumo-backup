import {
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BiEdit } from "react-icons/bi";

const ProfileInfo = () => {
  return (
    <Grid rowGap="8" p="6" rounded="md" bg="white">
      <Stack>
        <Text fontSize="12px">FIrst Name</Text>
        <InputGroup>
          <Input value="Adewale" />
          <InputRightElement>
            <BiEdit size="20px" cursor="pointer" />
          </InputRightElement>
        </InputGroup>
      </Stack>
      <Stack>
        <Text fontSize="12px">Last Name</Text>
        <InputGroup>
          <Input value="Adedamola" />
          <InputRightElement>
            <BiEdit size="20px" cursor="pointer" />
          </InputRightElement>
        </InputGroup>
      </Stack>
      <Stack>
        <Text fontSize="12px">Email Address</Text>
        <InputGroup>
          <Input value="adedamolamoses@gmail.com" />
          <InputRightElement>
            <BiEdit size="20px" cursor="pointer" />
          </InputRightElement>
        </InputGroup>
      </Stack>
      <Stack>
        <Text fontSize="12px">Old Password</Text>
        <InputGroup>
          <Input value="******************" />
          <InputRightElement>
            <BiEdit size="20px" cursor="pointer" />
          </InputRightElement>
        </InputGroup>
      </Stack>
      <Stack>
        <Text fontSize="12px">New Password</Text>
        <InputGroup>
          <Input value="" />
          <InputRightElement>
            <BiEdit size="20px" cursor="pointer" />
          </InputRightElement>
        </InputGroup>
      </Stack>
    </Grid>
  );
};

export default ProfileInfo;
