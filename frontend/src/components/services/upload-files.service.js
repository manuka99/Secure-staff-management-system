import Api from "../../common/Api";

export const FileUploadApi = (payload) => {
  return Api().post(`/upload`, payload);
};

export const MsgUploadApi = (payload) => {
  return Api().post(`/message`, payload);
};
