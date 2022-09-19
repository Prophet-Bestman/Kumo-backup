import config from "utils/config";

const configOptions = () => {
  if (typeof window === "undefined") return {};

  if (!window.localStorage.getItem(config.key.token)) return {};

  const accessToken = window.localStorage.getItem(config.key.token);

  if (!!accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }
};

export const getUserID = () => {
  if (typeof window === "undefined") return {};

  if (!window.localStorage.getItem(config.key.userID)) return {};

  const userID = window.localStorage.getItem(config.key.userID);

  if (!!userID) {
    return userID;
  }
};

export const getUserFromLocalStorage = () => {
  if (typeof window === "undefined") return {};

  if (!window.localStorage.getItem(config.key.user)) return {};

  const user = window.localStorage.getItem(config.key.user);

  if (!!user) {
    return JSON.parse(user);
  }
};

export const getHeaders = (accessToken) => {
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

export default configOptions;
