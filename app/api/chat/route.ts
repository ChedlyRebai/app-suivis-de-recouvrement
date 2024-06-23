import { NextRequest, NextResponse } from "next/server";
import { Message } from "ai";
import { callChain } from "@/lib/langchain";

export const runtime = "edge";

function formatMessage(message: Message) {
  return `${message.role === "user" ? "Human" : "Assistant"}: ${
    message.content
  }`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages: Message[] = body.messages ?? [];
  const formattedPreviousMessages = messages
    .slice(0, -1)
    .map((m) => formatMessage(m));
  const question = messages[messages.length - 1].content;

  if (!question) {
    return NextResponse.json("Error: No question in the request", {
      status: 400,
    });
  }

  try {
    const streamingTextResponse = await callChain({
      question,
      chatHistory: formattedPreviousMessages.join("\n"),
    });

    return streamingTextResponse;
  } catch (err) {
    console.log("Internal server error", err);
    return NextResponse.json("Error: Something went wrong! Try Again!", {
      status: 500,
    });
  }
}
