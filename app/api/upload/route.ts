import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import axios from "axios";

export const runtime = "edge";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
); // 7-character random string
export async function POST(req: Request) {
  const file = req.body || "";
  console.log("file", file);
  const contentType = req.headers.get("content-type") || "text/plain";
  const filename = `${nanoid()}.${contentType.split("/")[1]}`;
  console.log("filename", filename);

  //await axios.post("http://localhost:10004/file/upload", file);
  console.log("contentType", contentType);
  const blob = await put(filename, file, {
    contentType,
    access: "public",
  });

  return NextResponse.json(blob);
}
