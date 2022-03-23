import axios from "axios";

export const getExcursions = async() => {
  const {data} = await axios.get("/getexcursion");
  return data;
};
