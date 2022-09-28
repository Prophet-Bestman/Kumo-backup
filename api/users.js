import axios from "axios";
import { useQuery } from "react-query";
import { baseUrl } from "./baseUrl";
import configOptions from "./config";

const request = axios.create({
  baseURL: baseUrl + "/admin/users",
});

export const useGetUsers = () => {
  const headers = configOptions();
  return useQuery("users", () =>
    request.get(`/get-users`, { headers: headers }).then((res) => res.data)
  );
};

export const useSingleGetUser = (id, options) => {
  const headers = configOptions();
  return useQuery(
    ["single-user", id, options],
    () =>
      request
        .get(`/get-user/${id || ""}`, { headers: headers })
        .then((res) => res.data),
    { ...options }
  );
};
