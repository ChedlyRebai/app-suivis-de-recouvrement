"use server";
import axios from "axios";
import { Console } from "console";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const Logn = async (matricule: string, password: string) => {
  //2axios.defaults.baseURL =
  //"https://app-suivis-de-recouvrement-server-37up.vercel.app/";

  const res = await axios.post(`${process.env.LOGIN_API_URL}/auth/login`, {
    matricule,
    password,
  });
  // console.log(res.data);
  // const cookie = (res.headers["set-cookie"] || [""])[0];
  // const token = cookie.split(";")[0];
  // console.log("token");
  // console.log(token);
  // console.log("********************************************************");
  // console.log(res.data.message);
  // console.log("********************************************************");
  // const decoded = jwtDecode(token);
  // if(res.status === 200) return decoded;
  return {};
};
export const Login = async (matricule: string, password: string) => {
  try {
    console.log(`${process.env.LOGIN_API_URL}/auth/login`);
    const res = await axios.post(`${process.env.LOGIN_API_URL}/auth/login`, {
      matricule,
      password,
    });

    if (res.status === 200) {
      const expires = new Date(Date.now() + 1000 * 1000 * 1000);
      cookies().set("session", res.data.token, { expires, secure: true });
      return Promise.resolve({ status: res.status, data: res.data.message });
    }
  } catch (error: any) {
    console.error("Login error:", error?.response?.data?.message);
    return Promise.resolve({
      status: error?.response.status,
      data: error?.response?.data?.message,
    }); // Or any other generic error message
  }
};

export const Logout = async () => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");
    axios.defaults.baseURL = `${process.env.LOGIN_API_URL}`;
    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const res = await axios.post(
      `${process.env.LOGIN_API_URL}/auth/logout`,
      {}
    );
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.error("Login error:", error);
    return Promise.resolve({
      status: error?.response.status,
      data: error?.response?.data?.message,
    }); // Or any other generic error message
  }
};
