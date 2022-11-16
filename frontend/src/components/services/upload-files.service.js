import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:5000/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

class UploadFilesService {
  upload(file, fileName) {
    let formData = new FormData();

    formData.append("file", file);

    return api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      fileName,
    });
  }

  // getFiles() {
  //   return api.get('/files');
  //  }
}

export default new UploadFilesService();
