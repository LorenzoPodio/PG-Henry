import axios from "axios";

export const getAllUserAdmins = async() => {
  const {data} = await axios.get("http://localhost:3001/getAllUserAdmins");
  return data;
};
