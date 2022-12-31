import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { numberWithCommas, numberWithCommasNoDecimal } from "utils/helpers";

export default function StatsCard({ stats }) {
  const title = stats?.name?.replace("_", " ");

  return (
    <Box bg="white" shadow="base" py="12" px="5" w="300px">
      <Text
        fontWeight={700}
        textTransform="capitalize"
        fontSize="14px"
        color="app.primary.700"
      >
        {title}
      </Text>

      <Text fontSize="20px" fontWeight="600" color="gray.800">
        {stats?.name === "total_usd"
          ? `$${numberWithCommas(stats.total)}`
          : stats?.name === "total_ngn"
          ? `N${numberWithCommas(stats.total)}`
          : numberWithCommasNoDecimal(stats?.total)}
        {/* {stats.total} */}
      </Text>
    </Box>
  );
}
