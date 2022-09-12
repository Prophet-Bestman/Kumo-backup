import {
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BiToggleLeft, BiToggleRight } from "react-icons/bi";

const MoreInfo = () => {
  return (
    <Grid rowGap="8" p="6" rounded="md" bg="white">
      <Stack>
        <Text fontSize="12px">Language</Text>

        <Select value="">
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
        </Select>
      </Stack>
      <Stack>
        <Text fontSize="12px">Verify Email</Text>
        <InputGroup>
          <Input value="adedamolamoses@gmail.com" />
          <InputRightElement color="gray.300">
            <BiToggleLeft size="30px" cursor="pointer" />
          </InputRightElement>
        </InputGroup>
      </Stack>
      <Stack>
        <Text fontSize="12px">Verify Phone Number</Text>
        <InputGroup>
          <Input value="090236728392" />
          <InputRightElement color="green.500">
            <BiToggleRight size="30px" cursor="pointer" />
          </InputRightElement>
        </InputGroup>
      </Stack>
      <Stack>
        <Text fontSize="12px">BVN Verification</Text>
        <InputGroup>
          <Input value="29387847282" />
          <InputRightElement color="green.500">
            <BiToggleRight size="30px" cursor="pointer" />
          </InputRightElement>
        </InputGroup>
      </Stack>
      <Stack>
        <Text fontSize="12px">Two Factor Verification</Text>
        <InputGroup>
          <Input value="29387847282" />
          <InputRightElement color="green.500">
            <BiToggleRight size="30px" cursor="pointer" />
          </InputRightElement>
        </InputGroup>
      </Stack>
      <Stack>
        <Text fontSize="12px">Notifications</Text>
        <InputGroup>
          <Input value="Enabled" />
          <InputRightElement color="green.500">
            <BiToggleRight size="30px" cursor="pointer" />
          </InputRightElement>
        </InputGroup>
      </Stack>
    </Grid>
  );
};

export default MoreInfo;
