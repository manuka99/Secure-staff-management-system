import axios from "axios";
import swal from "sweetalert";
import { APP_URL, APP_USER_TOKEN } from "../config";

export default function Api(nonApi = false) {
  let user_token = localStorage.getItem(APP_USER_TOKEN);
  const Api = axios.create({
    baseURL: `${APP_URL}${nonApi ? "" : "/api"}`,
    timeout: 30 * 60000,
    headers: {
      "x-auth-token": user_token,
      "Content-Type": "application/json",
    },
  });

  Api.interceptors.response.use(
    (response) => response,
    (error) => {
      //  const originalRequest = error.config;
      if (error.response) {
        const { status, data } = error.response;
        if (data && data.data.msg) swal(data.data.msg);
        if (status === 400) {
        } else if (status === 401) {
          swal("401: You do not have permision for the requested content.");
        } else if (status === 403) {
          //no required roles
          swal("403: You do not have permision for the requested content.");
        } else if (status === 404) {
        } else if (status === 419) {
          swal("Unexpected error 419: Refresh the webpage and try again");
        } else if (status === 422) {
          //errors in form submit
        } else if (status === 423) {
          //password confirmation
        } else if (status === 500) swal(error.message);
        else swal(error.message);
      } else {
        swal(error.message);
      }
      return Promise.reject(error);
    }
  );

  return Api;
}
