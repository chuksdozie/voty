import axios from "axios";
import { URLS } from "../constants/urls";

const axiosService = axios.create({
  baseURL: URLS.baseUrl,
  headers: {
    "content-type": "application/json",
    "voty-auth": "",
  },
});

export default axiosService;
