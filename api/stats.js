import axios from "axios";
import { useQuery } from "react-query";
import { baseUrl } from "./baseUrl";
import configOptions from "./config";

const request = axios.create({
  baseURL: baseUrl + "/admin/stats",
});

export const useGetOverallStats = (options) => {
  const headers = configOptions();
  return useQuery(
    "overall-stats",
    () =>
      request
        .get(`/get-overall-stats`, { headers: headers })
        .then((res) => res.data),
    { ...options }
  );
};

export const useGetUSDStats = () => {
  const headers = configOptions();
  return useQuery("USD-stats", () =>
    request
      .get(`/get-overall-stats`, { headers: headers })
      .then((res) => res.data)
  );
};
