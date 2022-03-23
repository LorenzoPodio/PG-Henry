import axios from "axios";

export const getAllUsers = async () => {
  try {
    const { data } = await axios.get("/getusers");
    return data;
  } catch (e) {
    console.log(e);
  }
};
