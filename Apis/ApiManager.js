/** @format */

import axios from "axios";

const ApiManager = axios.create({
  baseURL: "http://192.168.90.225/react_native/location_detector",
  responseType: "json",
  withCredentials: true,


});
export default ApiManager;
