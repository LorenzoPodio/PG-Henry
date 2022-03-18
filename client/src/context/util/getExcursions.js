import axios from "axios";

export const getExcursions = async() => {
  const {data} = await axios.get("http://localhost:3001/getexcursion");
  return data;
};
