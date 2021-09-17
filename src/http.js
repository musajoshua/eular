import axios from "axios";

// setup axios
axios.defaults.baseURL = "https://api.opensea.io/api/v1";

/*
 * @param {string} url - the url to get
 * @param {object} params - key value pair of query string parameters
 */
export const getRequest = (url, params = {}) => {
  return axios.get(url, { params });
};

/*
 * @param {string} url - the url to post
 * @param {object} data - key value pair of body parameters
 */
export const postRequest = (url, data) => {
  return axios.post(url, data);
};
