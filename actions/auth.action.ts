"use server";
import axios from "axios";
import { STATUS_CODES } from "http";

import Cookies from "js-cookie";
export const Login = async (matricule: string, password: string) => {
  console.log(`${process.env.API_URL}/login`);
  const res = await axios.post(`${process.env.API_URL}/auth/login`, {
    matricule,
    password,
  });
  console.log(res);
  const cookie = (res.headers["set-cookie"] || [""])[0];
  const token = cookie.split(";")[0];
  //console.log(token);
  console.log(res.data);
  Cookies.set("token", res.data);
  if (res.status === 200)
    return {
      token: token,
      status: res.status,
      message: res.data.message || "",
    };
  return {
    token: "",
    status: res.status,
    message: "",
  };
};
