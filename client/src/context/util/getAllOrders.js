import axios from "axios";

export const getAllOrders = async() => {
  const {data} = await axios.get("http://localhost:3001/cart/getallorders");
  return data;
};
