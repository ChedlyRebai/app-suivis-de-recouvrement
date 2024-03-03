"use server";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { Login } from "./actions/auth.action";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  console.log("payload", payload);
  const expirationTime = Math.floor(Date.now() / 1000) + 10 * 60 * 60; // 10 hours from now
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  console.log(input);
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  console.log(payload);
  return payload;
}

export async function login(matricule: string, password: string) {
  const user = await Login(matricule, password);
  console.log("user");
  console.log(user);
  const expires = new Date(Date.now() + 1000 * 1000);
  const session = await encrypt({ user, expires });
  console.log("session");
  console.log(session);
  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;
  const parsed = await decrypt(session);
  parsed.expires = Math.floor(Date.now() / 1000) + 10 * 60 * 60;
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
