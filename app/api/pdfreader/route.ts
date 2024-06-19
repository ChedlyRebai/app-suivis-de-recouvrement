// import { PutBlobResult, put } from "@vercel/blob";
// import { NextRequest, NextResponse } from "next/server";
// import { customAlphabet } from "nanoid";
// import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";

// export const runtime = "edge";

// const nanoid = customAlphabet(
//   "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
//   7
// );
// // export async function POST(req: Request): Promise<NextResponse<PutBlobResult>> {
// //   const file = req.body || "";
// export async function POST(req: Request): Promise<NextResponse<String>> {
//   try {
//     const file = req.body || "";

//     const pdfExtract = new PDFExtract();
//     const options: PDFExtractOptions = {};
//     const data = await pdfExtract.extract(file.toString(), options); // Convert the file to a string
//     console.log(data);
//     return NextResponse.json("data");
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json("An error occurred while processing the PDF");
//   }
// }
