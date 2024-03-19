"use server ";

import axios from "axios";

export const getUserBuMatricule = async (matricule: string) => {
  try {
    //console.log(`${process.env.API_URL}/user`);

    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get(
      `/users/getUsername?matricule=${matricule}`
    );
    // console.log("response.data.usr_nomprenom");
    // console.log(response.data.usr_nomprenom);
    return response.data.usr_nomprenom || "";
  } catch (error) {
    console.log(error);
    return "";
  }
};
