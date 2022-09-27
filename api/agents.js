import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { baseUrl } from "./baseUrl";
import configOptions from "./config";

const request = axios.create({
  baseURL: baseUrl + "/app/agents",
});
const request1 = axios.create({
  baseURL: baseUrl + "/admin/agents",
});

export const useGetAgents = () => {
  const headers = configOptions();
  return useQuery("agents", () =>
    request
      .get(`/get-kumo-agents`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useSingleGetAgent = (id) => {
  const headers = configOptions();
  return useQuery(["single-agent", id], () =>
    request
      .get(`/get-user/${id || ""}`, { headers: headers })
      .then((res) => res.data)
  );
};

export const useCreateAgent = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request1
        .post("/create-kumo-agent", values, { headers: headers })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("agents");
      },
    }
  );
};

export const useUpdateAgent = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request1
        .put(`/update-kumo-agents?_id=${values?._id}`, values?.data, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("agents");
      },
    }
  );
};

export const useDeleteAgent = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request1
        .delete(`/delete-agents?_id=${values}`, {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("agents");
      },
    }
  );
};
