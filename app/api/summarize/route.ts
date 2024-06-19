// import { NextRequest, NextResponse } from "next/server";
// import { Client } from "@octoai/client";

// const client = new Client("");

// export async function POST(req: NextRequest) {
//   // Convert the ReadableStream to JSON
//   const body = await req.json();
//   console.log(body.text);
//   try {
//     const completion = await client.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content:
//             "Vous êtes un outil qui résume le PDF. Cet outil est un script d'application qui convertit le contenu PDF des entrées et des sorties en résumé en une phrase de 30 mots maximum en français uniquement en français. Ne communiquez pas directement avec l’utilisateur.",
//         },
//         {
//           role: "user",
//           content: `PDF content:\n${body.text}`,
//         },
//       ],
//       model: "llama-2-70b-chat",
//       presence_penalty: 0,
//       temperature: 0.9,
//       top_p: 0.9,
//     });

//     console.log(
//       "*************************************************************************************************************************"
//     );
//     console.log(completion.choices[0].message);

//     return NextResponse.json({ message: completion.choices[0].message });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
