import { getSession } from "@/lib";
import axios from "axios";

export const getLinksByCodeFonction = async (matricule: string) => {
  try {
    const user = await getSession();
    console.log(user);
    console.log(`${process.env.API_URL}/user`);

    axios.defaults.baseURL = "http://localhost:10000";
    const response = await axios.get(
      `/getLinks?codeFunction=${user.code_function}`
    );
    console.log(response.data);
    return response.data || [];
  } catch (error) {
    console.log(error);
    return "";
  }
};
