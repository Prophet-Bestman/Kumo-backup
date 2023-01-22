import { Button, Tag, Td, Tr, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { getStatusColor } from "utils/helpers";
import UpdatePackage from "./UpdatePackage";

const PackageRow = ({ singlePackage, number }) => {
  const {
    admin_creator_name,
    package_name,
    package_duration,
    package_apr,
    status,
  } = singlePackage;

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Tr key={singlePackage?._id} textAlign="center">
      <Td>{number}</Td>
      <Td>{package_name}</Td>
      <Td>{admin_creator_name}</Td>
      <Td>{package_apr}</Td>
      <Td>{package_duration[0]} </Td>
      <Td>
        <Tag textTransform="capitalize" color={getStatusColor(status)}>
          {status}
        </Tag>
      </Td>

      <Td>
        <Button size="sm" h="32px" onClick={onOpen}>
          Details
        </Button>
      </Td>
      {isOpen && (
        <UpdatePackage
          singlePackage={singlePackage}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Tr>
  );
};

export default PackageRow;
