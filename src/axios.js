import axios from "axios";
import {API_ACCESS_KEY} from "./shared";

export const axiosInstance =  axios.create({
  baseURL: `https://api.unsplash.com/`,
  params:{
    'per_page': 30
  },
  headers: {'Authorization': `Client-ID ${API_ACCESS_KEY}`}
});

export default axiosInstance;
