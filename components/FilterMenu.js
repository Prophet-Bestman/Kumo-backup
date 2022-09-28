import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
  Input,
  Box,
  Text,
  RadioGroup,
  Stack,
  Radio,
  Flex,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { addFilterSchema } from "utils/schema";
import InputError from "./InputError";
import ModalCard from "./ModalCard";

const FilterMenu = ({ filterObjs, setFilterObjs, filters, setFilters }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleSelectFilter = (filter) => {
    setSelectedFilter(filter);
    setFilters(filters?.filter((item) => item?.name !== filter?.name));
  };

  useEffect(() => {
    if (!!selectedFilter && Object?.keys(selectedFilter)?.length > 0) onOpen();
  }, [selectedFilter]);

  const closeFilter = () => {
    setSelectedFilter(null);
    onClose();
  };

  return (
    <Menu>
      <MenuButton
        size="sm"
        color="app.primary.500"
        bg="white"
        boxShadow="md"
        h="40px"
        _hover={{
          bg: "app.primaryTrans",
        }}
        as={Button}
        rightIcon={<MdOutlineKeyboardArrowDown size="20px" />}
        sx={{
          boxShadow: " rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;",
        }}
      >
        Filters
      </MenuButton>
      <MenuList>
        {/* <MenuItem onClick={onOpen}>Email</MenuItem> */}
        {filters?.map((filter) => (
          <MenuItem
            key={filter?.name}
            onClick={() => handleSelectFilter(filter)}
            textTransform="capitalize"
          >
            {filter?.name}
          </MenuItem>
        ))}
      </MenuList>

      {isOpen && (
        <ByEmail
          isOpen={isOpen}
          onClose={closeFilter}
          filter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filterObjs={filterObjs}
          setFilterObjs={setFilterObjs}
        />
      )}
    </Menu>
  );
};

export default FilterMenu;

const ByEmail = ({
  isOpen,
  onClose,
  setSelectedFilter,
  filter,
  setFilterObjs,
  filterObjs,
}) => {
  const [conjunction, setConjunction] = useState(filter?.conjuctions[0]);
  const [filterObj, setFilterObj] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addFilterSchema) });

  const handleAddFilter = (data) => {
    setFilterObj({
      name: filter?.name,
      conjunction,
      value: data?.value,
    });
  };

  useEffect(() => {
    if (!!filterObj && Object?.keys(filterObj)?.length > 0) {
      setFilterObjs([...filterObjs, filterObj]);
      onClose();
      setSelectedFilter(null);
    }
  }, [filterObj]);

  return (
    <ModalCard isOpen={isOpen} size="xs">
      <form onSubmit={handleSubmit(handleAddFilter)}>
        <Box my="8">
          <Text fontSize="14px" fontWeight={600} color="app.primary.900" mb="8">
            Filter By Email
          </Text>

          <Input placeholder="user@email.com" {...register("value")} />
          <InputError msg={errors?.value?.message} />

          <RadioGroup
            my="6"
            size="sm"
            colorScheme="teal"
            value={conjunction?.value}
            // onChange={setConjunction}
          >
            <Stack>
              {filter?.conjuctions?.map((conjuction) => (
                <Radio
                  key={conjuction.value}
                  value={conjuction?.value}
                  onClick={() => setConjunction(conjuction)}
                >
                  {conjuction.name}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>

          <Flex gap="2">
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
              h="10"
              flex="1"
            >
              Cancel
            </Button>
            <Button size="sm" h="10" flex="2" type="submit">
              Apply
            </Button>
          </Flex>
        </Box>
      </form>
    </ModalCard>
  );
};

const userFilters = [
  {
    name: "email",
    value: String,
    conjuction: "contains" || "does-not-contain",
  },
  {
    name: "verification",
    value: "verified" || "unverified",
    conjuction: "is",
  },
  {
    name: "language",
    value: String,
    conjuction: "speaks" || "does-not-speak",
  },
];
