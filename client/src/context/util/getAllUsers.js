import axios from "axios";

export const getAllUsers = async () => {
  try {
    const { data } = await axios.get("http://localhost:3001/getusers");
    return data;
  } catch (e) {
    console.log(e);
  }
};
