import { PutBlobResult, put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";

export const runtime = "edge";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
); // 7-character random string
export async function POST(req: Request): Promise<NextResponse<PutBlobResult>> {
  const file = req.body || "";

  const contentType = req.headers.get("content-type") || "text/plain";
  const filename = `${nanoid()}.${contentType.split("/")[1]}`;
  console.log(contentType);
  const pdfExtract = new PDFExtract();
  const options: PDFExtractOptions = {};
  const data = await pdfExtract.extract(file.toString(), options); // Convert the file to a string
  console.log(data);
  const blob = await put(filename, file, {
    contentType,
    access: "public",
  });

  return NextResponse.json(blob);
}
