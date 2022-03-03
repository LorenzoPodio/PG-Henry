import axios from "axios";

export const getExcursions = () => {
 return axios.get("http://localhost:3001/getexcursion").then((response) =>response.data);
};
