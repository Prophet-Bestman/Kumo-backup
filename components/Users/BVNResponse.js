import {
  Box,
  Grid,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import LargeHeading from "components/LargeHeading";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const BVNResponse = ({ isOpen, onClose, BVNDetails }) => {
  return (
    <Modal isOpen={isOpen} isCentered size="lg">
      <ModalOverlay />

      <ModalContent>
        <ModalBody pos="relative" py="12" px="8">
          <Box pos="absolute" top="6" right="6" cursor="pointer">
            <AiOutlineClose onClick={onClose} />
          </Box>

          <Box>
            <LargeHeading>BVN DETAILS</LargeHeading>

            <Img
              rounded="full"
              w="100px"
              h="100px"
              src={BVNDetails?.image}
              my="6"
            />

            <Grid
              mt="12"
              templateColumns={"repeat(2, 1fr)"}
              gap="4"
              rowGap="10"
            >
              <Stack>
                <Text ml="2" fontSize="12px" fontWeight={600}>
                  BVN
                </Text>
                <Input disabled value={BVNDetails?.bvn} />
              </Stack>
              <Stack>
                <Text ml="2" fontSize="12px" fontWeight={600}>
                  Phone Number
                </Text>
                <Input disabled value={BVNDetails?.phone_number1} />
              </Stack>
              <Stack>
                <Text ml="2" fontSize="12px" fontWeight={600}>
                  First Name
                </Text>
                <Input disabled value={BVNDetails?.first_name} />
              </Stack>
              <Stack>
                <Text ml="2" fontSize="12px" fontWeight={600}>
                  Last Name
                </Text>
                <Input disabled value={BVNDetails?.last_name} />
              </Stack>
              <Stack>
                <Text ml="2" fontSize="12px" fontWeight={600}>
                  Middle Name
                </Text>
                <Input disabled value={BVNDetails?.middle_name} />
              </Stack>
              <Stack>
                <Text ml="2" fontSize="12px" fontWeight={600}>
                  Gender
                </Text>
                <Input disabled value={BVNDetails?.gender} />
              </Stack>
            </Grid>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BVNResponse;
