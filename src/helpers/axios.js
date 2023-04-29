import axios from "axios";
const BASE = "http://127.0.0.1:8000/api/";
export const axiosInstance = axios.create({
  baseURL: BASE,
  headers: { Accept: "application/json" },
});

axiosInstance.interceptors.request.use(async function (conf) {
  if (conf.url !== "session" || conf.url !== "stats") {
    let token = localStorage.getItem("token");
    if (!token) {
      let { data } = await axios.post(BASE + "session");
      localStorage.setItem("token", data.token);
      token = data.token;
    }
    conf.headers.Auth = token;
  }
  return conf;
});
