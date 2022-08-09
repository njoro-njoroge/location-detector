/** @format */

import axios from "axios";

const ApiManager = axios.create({
  baseURL: "http://192.168.0.105/react_native/location_detector",
  responseType: "json",
  withCredentials: true,
});
export default ApiManager;
