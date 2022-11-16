import Api from "../common/Api";

export const LoginApi = payload => {
  return Api().post(`/user/login`, payload);
};

export const RegisterApi = payload => {
  return Api().post(`/user/register`, payload);
};