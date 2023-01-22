import { Tab, TabList } from "@chakra-ui/react";
import React from "react";

const CustomTabList = (props) => {
  const { tabList, justify, size, tabWidth } = props;
  return (
    <TabList
      display="flex"
      shadow="rgba(0, 0, 0, 0.07) 1px 1px 1px 0px;"
      justifyContent={justify || "start"}
      bg="white"
      py={size === "sm" ? "1" : "2"}
      px="4"
      {...props}
      gap={size === "sm" ? "2" : "4"}
    >
      {!!tabList &&
        tabList?.length > 0 &&
        tabList?.map((tab, i) => (
          <Tab
            key={i}
            w={tabWidth || "auto"}
            rounded="md"
            display="flex"
            alignItems={"center"}
            _selected={{
              bg: "app.primaryTrans2",
              color: "app.primary.900",
            }}
            color="gray.300"
            gap={size === "sm" ? "1" : "2"}
            fontSize={size === "sm" ? "10px" : "12px"}
            fontWeight="bold"
            py={size === "sm" ? "2" : "3"}
            px={size === "sm" ? "2" : "3"}
          >
            {tab.icon} {tab.title}
          </Tab>
        ))}
    </TabList>
  );
};

export default CustomTabList;
