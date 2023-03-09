import {
  Box,
  Circle,
  Flex,
  Spinner,
  Tag,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  useDisableUtility,
  useEnableUtility,
  useGetDisabledOperation,
} from "api/settings";
import { useGetAirtimeList } from "api/utilities";
import ConfirmModal from "components/ConfirmModal";
import LargeHeading from "components/LargeHeading";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiBlock } from "react-icons/bi";
import { customScrollBar3 } from "utils/styles";

const AirtimeList = () => {
  const [airtimeList, setAirtimeList] = useState([]);
  const [selectedAirtime, setSelectedAirtime] = useState(null);

  const { data, isLoading: loadingAirtimeList } = useGetAirtimeList();
  const { data: disabledOperationsResp, isLoading: loadingDisabledOperations } =
    useGetDisabledOperation();

  const {
    isOpen: isEnableOpen,
    onOpen: onEnableOpen,
    onClose: onEnableClose,
  } = useDisclosure();
  const {
    isOpen: isDisableOpen,
    onOpen: onDisableOpen,
    onClose: onDisableClose,
  } = useDisclosure();

  // ====== TOASTS ======
  const toast = useToast();

  const successToast = (msg) => {
    toast({
      title: "Action Successful",
      description: msg,
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top",
    });
  };

  useEffect(() => {
    if (!!data && data?.data?.length > 0) {
      let airtimeList = data?.data;

      airtimeList = airtimeList?.map((airtime) => {
        if (disabledOperationsResp?.data?.includes(airtime?.serviceID)) {
          return { ...airtime, disabled: true };
        } else return { ...airtime, disabled: false };
      });
      setAirtimeList(airtimeList);
    }
  }, [data, disabledOperationsResp]);

  const {
    mutate: disableAirtime,
    data: disableResp,
    isLoading,
    reset: resetDisable,
  } = useDisableUtility();

  const handleDisable = () => {
    disableAirtime({ service_id: selectedAirtime.serviceID });
  };

  useEffect(() => {
    if (!!disableResp && disableResp?.status === "success") {
      successToast("Succesfully Disabled Airtime");
      resetDisable();
      onDisableClose();
    }
  }, [disableResp]);

  const {
    mutate: enableAirtime,
    data: enableResp,
    isLoading: enabling,
    reset: resetEnable,
  } = useEnableUtility();

  const handleEnable = () => {
    enableAirtime({ service_id: selectedAirtime.serviceID });
  };

  useEffect(() => {
    if (!!enableResp && enableResp?.status === "success") {
      successToast("Succesfully Enabled Airtime");
      resetEnable();
      onEnableClose();
    }
  }, [enableResp]);

  return (
    <Box rounded="md" bg="white" py="12" px="6" shadow="md" h="full">
      <LargeHeading color="app.primary.700" fontSize="20px">
        Aitime List
      </LargeHeading>

      <Box overflowY="auto" h="280px" sx={customScrollBar3}>
        {loadingAirtimeList || loadingDisabledOperations ? (
          <Spinner colorScheme="gray" mx="auto" />
        ) : (
          airtimeList?.length > 0 &&
          airtimeList?.map((airtime, i) => (
            <Flex
              key={i}
              my="2"
              py="3"
              px="2"
              justifyContent="space-between"
              bg="#efefef"
            >
              <Text fontSize="14px" fontWeight="600">
                {airtime.name}
              </Text>

              <Flex gap="2">
                <Tag
                  colorScheme={airtime?.disabled ? "red" : "green"}
                  size="sm"
                >
                  {airtime?.disabled ? "Disabled" : "Enabled"}
                </Tag>
                {airtime?.disabled ? (
                  <AiOutlineCheckCircle
                    color="green"
                    size="18px"
                    cursor="pointer"
                    onClick={() => {
                      setSelectedAirtime(airtime);
                      onEnableOpen();
                    }}
                  />
                ) : (
                  <BiBlock
                    color="red"
                    cursor="pointer"
                    size="18px"
                    onClick={() => {
                      setSelectedAirtime(airtime);
                      onDisableOpen();
                    }}
                  />
                )}
                {/* <Circle
                  bg={token.is_listed ? "green.400" : "red.400"}
                  size="8px"
                  my="auto"
                /> */}
              </Flex>
              {/* {isUpdateOpen && (
                <UpdateCryptoToken
                  onClose={onUpdateClose}
                  isOpen={isUpdateOpen}
                  token={selectedAirtime}
                />
              )} */}
            </Flex>
          ))
        )}
      </Box>

      <ConfirmModal
        isOpen={isDisableOpen}
        onClose={onDisableClose}
        primaryFunc={{ name: "Disable Airtime", func: handleDisable }}
        message={"Are you sure you want to disable this airtime"}
        isLoading={isLoading}
      />
      <ConfirmModal
        isOpen={isEnableOpen}
        onClose={onEnableClose}
        primaryFunc={{ name: "Enable Airtime", func: handleEnable }}
        message={"Are you sure you want to enable this airtime"}
        isLoading={enabling}
      />
    </Box>
  );
};

export default AirtimeList;
