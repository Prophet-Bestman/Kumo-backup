import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { baseUrl } from "./baseUrl";
import configOptions from "./config";

const request = axios.create({
  baseURL: baseUrl + "/admin/investment",
});

export const useCreatePackage = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post("/create-package", values, { headers: headers })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("packages");
      },
    }
  );
};
