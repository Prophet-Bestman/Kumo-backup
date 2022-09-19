import axios from "axios";
import { useMutation } from "react-query";
import config from "utils/config";
import { baseUrl } from "./baseUrl";

const request = axios.create({
  baseURL: baseUrl + "/admin/auth",
});

export const useLogin = () => {
  return useMutation(
    (values) => request.post("/login", values).then((res) => res.data),
    {
      onSuccess: (res) => {
        localStorage.setItem(config.key.user, JSON.stringify(res.data));
        localStorage.setItem(config.key.token, res.data.token);
        localStorage.setItem(config.key.userID, res.data.user_id);
      },
    }
  );
};
