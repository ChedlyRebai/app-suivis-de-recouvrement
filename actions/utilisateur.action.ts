"use server ";

import axios from "axios";

export const getUserBuMatricule = async (matricule: string) => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get(
      `https://amenbankapi.vercel.app/users/getUsername?matricule=${matricule}`
    );
    return response.data.usr_nomprenom || "";
  } catch (error) {
    console.log(error);
    return "";
  }
};
