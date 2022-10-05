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

export const useGetPackages = (page) => {
  const headers = configOptions();
  return useQuery(["packages", page], () =>
    request
      .get(`/get-packages?item_per_page=20&page=${page}`, {
        headers: headers,
      })
      .then((res) => res.data)
  );
};

export const useUpdatePackage = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/update-package?_id=${values?.id}`, values?.data, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("packages");
      },
    }
  );
};

export const useDeletePackage = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .delete(`/delete-package?_id=${values}`, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("packages");
      },
    }
  );
};
