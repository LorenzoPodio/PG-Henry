import axios from "axios";

export const getAllUsers = async() => {
  const {data} = await axios.get("http://localhost:3001/getusers");
  return data;
};
