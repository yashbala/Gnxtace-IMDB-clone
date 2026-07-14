import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

const instance = axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 500000,
  headers: {
    Accept: "application/json",
  },
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  };

  if (!(config.data instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  return {
    ...config,
    headers,
  };
});
const responseBody = (response) => response.data;

const requests = {
  get: (url, body) => instance.get(url, body).then(responseBody),
  post: (url, body) => instance.post(url, body).then(responseBody),
  put: (url, body) => instance.put(url, body).then(responseBody),
  delete: (url, body) => instance.delete(url, body).then(responseBody),
};

export default requests;
