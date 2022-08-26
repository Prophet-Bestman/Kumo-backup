import { Tab, TabList, Tabs } from "@chakra-ui/react";
import React from "react";

const CustomTabList = (props) => {
  const { tabList, justify, size } = props;
  return (
    <TabList
      display="flex"
      justifyContent={justify || "start"}
      bg="white"
      py={size === "sm" ? "1" : "2"}
      px="4"
      {...props}
      gap="4"
    >
      {!!tabList &&
        tabList?.length > 0 &&
        tabList?.map((tab, i) => (
          <Tab
            rounded="md"
            display="flex"
            alignItems={"center"}
            _selected={{
              bg: "app.primaryTrans2",
              color: "app.primary.900",
            }}
            color="gray.300"
            gap="2"
            fontSize="12px"
            fontWeight="bold"
            py={size === "sm" ? "2" : "3"}
          >
            {tab.icon} {tab.title}
          </Tab>
        ))}
    </TabList>
  );
};

export default CustomTabList;
