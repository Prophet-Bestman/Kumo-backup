import axios from "axios";
import { useQuery } from "react-query";
import { baseUrl } from "./baseUrl";
import configOptions from "./config";

const request = axios.create({
  baseURL: baseUrl + "/app/logger",
});

export const useGetAllLogger = (page) => {
  const headers = configOptions();
  return useQuery(["logger", page], () =>
    request
      .get(`/get-logger?item_per_page=20&page=${page}`, { headers: headers })
      .then((res) => res.data)
  );
};
export const useGetAllLoggerSize = () => {
  const headers = configOptions();
  return useQuery("logger-size", () =>
    request
      .get(`/get-logger?component=count`, { headers: headers })
      .then((res) => res.data)
  );
};
export const useGetSingleLogger = () => {
  const headers = configOptions();
  return useQuery("single-logger", () =>
    request
      .get(`/get-logger/62d9b5c453a44511cda05096`, {
        headers: headers,
      })
      .then((res) => res.data)
  );
};
