"use server";

import axios from "axios";

export const getAllDroitAccess = async () => {
  console.log(`${process.env.API_URL}/droit`);
  const res = await axios.get(`${process.env.API_URL}/droit`);
  console.log(res);
  return res;
};
