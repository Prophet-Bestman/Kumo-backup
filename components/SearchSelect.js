import {
  Box,
  Flex,
  Input,
  Menu,
  Spinner,
  Text,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import useDropdownVisible from "utils/hooks";
// import CustomMenuItem from "./CustomMenuItem";
// import CustomMenuList from "./CustomMenuList";
import InputError from "./InputError";

const SearchSelect = ({
  values,
  handleChange,
  setValue,
  getItemValue,
  isLoading,
  handleSelect,
  placeholder,
  defaultValue,
  width,
}) => {
  const { ref, show, setShow } = useDropdownVisible("none");
  const [text, setText] = useState("");

  const selectOption = (item) => {
    handleSelect(item);
    setText(getItemValue(item)?.name);
    setValue(getItemValue(item)?.name);
    setShow("none");
  };

  useEffect(() => {
    setText(defaultValue);
  }, [defaultValue]);

  const handleFocus = () => {
    setValue(text);
    setShow("flex");
  };

  return (
    <Box pos="relative" ref={ref}>
      <button></button>
      <Input
        value={text}
        defaultValue={defaultValue}
        onChange={(e) => {
          setText(e?.target?.value);
          handleChange(e);
        }}
        autoFocus={false}
        onFocus={handleFocus}
        placeholder={placeholder}
      />
      {text?.length > 0 && text?.length < 3 && (
        <InputError message={"Enter at least 3 characters"} />
      )}
      <Menu isOpen={true}>
        <MenuList
          w={["350px"]}
          minH="160px"
          maxH="280px"
          pos="absolute"
          top="16"
          left="0"
          display={show}
          flexDir="column"
          overflowY={"auto"}
        >
          {isLoading ? (
            <Flex justify="center" alignItems="center" h="160px">
              <Spinner color="app.primary" />
            </Flex>
          ) : !!values && values?.length > 0 ? (
            values?.map((item) => (
              <MenuItem
                key={getItemValue(item).key}
                onClick={() => selectOption(item)}
                h="50px"
              >
                {getItemValue(item).name}
              </MenuItem>
            ))
          ) : (
            <Flex justify="center" alignItems="center" h="160px">
              <Text
                w="full"
                color="app.primaryTrans"
                fontSize="20px"
                textAlign="center"
                fontWeight={600}
              >
                No content found
              </Text>
            </Flex>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};
export default SearchSelect;
