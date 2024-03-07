"use server";
import axios from "axios";
import { STATUS_CODES } from "http";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
export const Login = async (matricule: string, password: string) => {
  axios.defaults.baseURL =
    "https://app-suivis-de-recouvrement-server-37up.vercel.app/";
  console.log(`${process.env.API_URL}/login`);
  const res = await axios.post(`/auth/login`, {
    matricule,
    password,
  });
  const cookie = (res.headers["set-cookie"] || [""])[0];
  const token = cookie.split(";")[0];
  console.log("token");
  console.log(token);
  console.log(res.data);
  const decoded = jwtDecode(token);
  Cookies.set("token", res.data);

  if (res.status === 200) return decoded;
  return {};
};
