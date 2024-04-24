import { getSession } from "@/lib";
import axios from "axios";

export const getLinksByCodeFonction = async () => {
  try {
    const user = await getSession();
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get(
      `https://app-suivis-de-recouvrement-ser-git-69cf99-chedlyrebais-projects.vercel.app/droit/getLinks?codeFunction=${user.code_function}`
    );
    return response.data || [];
  } catch (error) {
    console.log(error);
    return "";
  }
};
