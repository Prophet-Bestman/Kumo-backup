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
      .get(`/get-packages?item_per_page=20&page=${page || 1}`, {
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
export const useAddToken = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/add-token?_id=${values?.id}`, values?.data, {
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

export const useUpdateInvestment = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/update-investment?_id=${values?.id}`, values?.data, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("investments");
      },
    }
  );
};

export const useAdminActivateInvestment = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/activate-investment?_id=${values?.id}`, values?.data, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("investments");
      },
    }
  );
};

export const useAdminTerminateInvestment = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(
          `/admin-terminate-investment?_id=${values?.id}&user_id=${values.user_id}`,
          values?.data,
          {
            headers: headers,
          }
        )
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("investments");
      },
    }
  );
};

export const useRemoveToken = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .delete(`/remove-token?_id=${values.id}`, {
          headers: headers,
          data: values.data,
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

export const useGetInvestments = (page) => {
  const headers = configOptions();
  return useQuery(["investments", page], () =>
    request
      .get(`/get-investments?item_per_page=20&page=${page}`, {
        headers: headers,
      })
      .then((res) => res.data)
  );
};

export const useGetUserInvestments = (user_id, page) => {
  const headers = configOptions();
  return useQuery(["user-investments", page, user_id], () =>
    request
      .get(`/get-investments?item_per_page=20&page=${page}&q=${user_id}`, {
        headers: headers,
      })
      .then((res) => res.data)
  );
};
