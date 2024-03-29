import axios from "axios";
import { useQuery } from "react-query";
import { baseUrl } from "./baseUrl";
import configOptions, { getUserID } from "./config";

const request = baseUrl + "/admin/admin";

export const useGetAdmin = (options) => {
  const headers = configOptions();
  const id = getUserID();

  return useQuery(
    ["single-user", id, options],
    () =>
      axios
        .get(request + `/get-admin/${id || ""}`, { headers: headers })
        .then((res) => res.data),
    {
      ...options,
      enabled: false,
    }
  );
};
