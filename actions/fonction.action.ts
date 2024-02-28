import axios from "axios";

export const getAllFunctions = async () => {
  console.log(`${process.env.API_URL}/fonction`);
  const res = await axios.get(`${process.env.API_URL}/fonction`);
  console.log(res);
  return res;
};
