import { getSession } from "@/lib";
import axios from "axios";

export const getLinksByCodeFonction = async () => {
  try {
    const user = await getSession();
    console.log(user);
    console.log(`${process.env.API_URL}/getlinks`);
    console.log(user.code_function);
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get(
      `https://amenbankapi.vercel.app/droit/getLinks?codeFunction=${user.code_function}`
    );
    console.log(response.data);
    return response.data || [];
  } catch (error) {
    console.log(error);
    return "";
  }
};
