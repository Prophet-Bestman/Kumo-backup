import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillForward, AiOutlineBackward } from "react-icons/ai";

const Pagination = ({ pages, page, setPage }) => {
  return (
    <Flex>
      <Box bg="white" rounded="md" shadow="sm" my="3" ml="auto">
        <Text textAlign="center" fontWeight="700">
          {page}/ {pages}
        </Text>
        <Flex
          w="28"
          h="14"
          alignItems="center"
          justify="space-between"
          padding="4"
          fontSize="30"
        >
          <Button
            size="sm"
            variant="unstyled"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <AiOutlineBackward size="24" />
          </Button>
          <Button
            size="sm"
            variant="unstyled"
            disabled={page >= pages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            <AiFillForward size="24" />
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Pagination;
