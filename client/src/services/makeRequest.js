import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true //for passing cookies
});

export function makeRequest(url, options) {
  return axios(url, options)
    .then(res, data)
    .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"));
};