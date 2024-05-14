import { getSession } from "@/lib";
import axios from "axios";

export const getLinksByCodeFonction = async () => {
  try {
    const user = await getSession();
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get(
      `https://sprint1-v2-beta.vercel.app/droit/getLinks?codeFunction=${user.code_function}`
    );
    return response.data || [];
  } catch (error) {
    console.log(error);
    return "";
  }
};
