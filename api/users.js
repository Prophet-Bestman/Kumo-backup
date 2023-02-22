import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { baseUrl } from "./baseUrl";
import configOptions from "./config";

const request = axios.create({
  baseURL: baseUrl + "/admin/users",
});

export const useGetUsers = () => {
  const headers = configOptions();
  return useQuery("users", () =>
    request
      .get(`/get-users?item_per_page=20`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useGetAllAdminReplies = () => {
  const headers = configOptions();
  return useQuery("admin-replies", () =>
    request
      .get(`/get-admin-replies?item_per_page=20`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useGetUserAdminReplies = (user_id) => {
  const headers = configOptions();
  return useQuery(["admin-replies", user_id], () =>
    request
      .get(`/get-admin-replies/${user_id}`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useGetUsersSize = () => {
  const headers = configOptions();
  return useQuery("users-size", () =>
    request
      .get(`/get-users?component=count`, { headers: headers })
      .then((res) => res.data)
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

export const useGetReferrals = () => {
  const headers = configOptions();
  return useQuery(["referrals"], () =>
    request
      .get(`/get-all-referrals?item_per_page=20`, { headers: headers })
      .then((res) => res.data)
  );
};
export const useGetUserReferrals = (user_id) => {
  const headers = configOptions();
  return useQuery(["user-referrals", user_id], () =>
    request
      .get(`/get-users-referral-list?_id=${user_id}&item_per_page=20`, {
        headers: headers,
      })
      .then((res) => res.data)
  );
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .delete(`/delete-user/${values}`, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
};

export const useFreezeUser = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/freeze-user-account`, values?.data, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
};

export const useUnfreezeUser = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/unfreeze-user-account`, values?.data, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
};

export const useLookupBvn = (bvn) => {
  const headers = configOptions();
  return useQuery(
    "bvn-validity",
    () =>
      request
        .get(`/lookup-bvn-validity?bvn=${bvn}`, { headers: headers })
        .then((res) => res.data),
    {
      enabled: false,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
};

export const useApproveBvn = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(
          `/approve-user-bvn-validation?user_id=${values?.user_id}`,
          values?.data,
          {
            headers: headers,
          }
        )
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        queryClient.invalidateQueries("single-user");
      },
    }
  );
};

export const useResetUsersPin = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`admin-reset-users-pin?_id=${values?.id}`, values?.data, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        queryClient.invalidateQueries("single-user");
      },
    }
  );
};

export const useResendActivationCode = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post(`/resend-activation-code`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        queryClient.invalidateQueries("single-user");
      },
    }
  );
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/update-users-status`, values, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        queryClient.invalidateQueries("single-user");
      },
    }
  );
};

export const useResetUserPassword = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/reset-users-password?_id=${values?.user_id}`, values?.data, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        queryClient.invalidateQueries("single-user");
      },
    }
  );
};
