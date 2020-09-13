import axios from "axios";

const setAxiosProxy = (url) => {
  axios.defaults.baseURL = url;
};

export default setAxiosProxy;
