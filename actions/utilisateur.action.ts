"use server ";

import axios from "axios";

export const getUserBuMatricule = async (matricule: string) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get(
      `https://app-suivis-de-recouvrement-ser-git-69cf99-chedlyrebais-projects.vercel.app/users/getUsername?matricule=${matricule}`
    );
    return response.data.usr_nomprenom || "";
  } catch (error) {
    console.log(error);
    return "";
  }
};
