export const statuses = {
  pending: "pending",
  failed: "failed",
  unverified: "uverified",
  fulfilled: "fulfilled",
  verified: "verified",
  active: "active",
  terminated: "terminated",
  ongoing: "ongoing",
  inactive: "inactive",
};

export const statusColors = {
  pending: "yellow.500",
  failed: "red.400",
  fulfilled: "green.400",
};

export const currencies = ["bitcoin", "ethereum", "dash", "tron"];

export const successToastConfig = {
  status: "success",
  duration: 3000,
  isClosable: true,
  variant: "top-accent",
  position: "top",
};
