import axios from "axios";

const setAxiosBaseURL = (url) => {
  axios.defaults.baseURL = url;
};

export default setAxiosBaseURL;
