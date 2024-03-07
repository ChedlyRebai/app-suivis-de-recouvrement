import { getSession } from "@/lib";
import axios from "axios";

export const getLinksByCodeFonction = async () => {
  try {
    const { user } = await getSession();
    console.log(user);
    console.log(`${process.env.API_URL}/getlinks`);
    console.log(user.code_function);
    axios.defaults.baseURL =
      "https://app-suivis-de-recouvrement-server-37up.vercel.app";
    const response = await axios.get(
      `/droit/getLinks?codeFunction=${user.code_function}`
    );
    console.log(response.data);
    return response.data || [];
  } catch (error) {
    console.log(error);
    return "";
  }
};
