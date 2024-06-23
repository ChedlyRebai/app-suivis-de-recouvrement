import { Pinecone } from "@pinecone-database/pinecone";
import { StreamingTextResponse } from "ai";

import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { BytesOutputParser } from "@langchain/core/output_parsers";
import { formatDocumentsAsString } from "langchain/util/document";
import { ChatOpenAI } from "@langchain/openai";
import { getVectorStore } from "./vector-store";

const questionPrompt = PromptTemplate.fromTemplate(
  `You are an enthusiastic AI assistant. Use the following pieces of context to answer the question at the end to someone that does not have techical knowledge about machine learning. When you come across a machine learning term, explain it briefly.
  If you don't know the answer, say that you don't know. Respond with ten sentences.
  Use the exact wording as the context.
  ----------
  CONTEXT: {context}
  ----------
  CHAT HISTORY: {chatHistory}
  ----------
  QUESTION: {question}
  ----------
  Helpful Answer:`
);

const streamingModel = new ChatOpenAI({
  modelName: "gpt-4o",
  streaming: true,
  verbose: true,
  temperature: 0.2,
});

export async function callChain({
  question,
  chatHistory,
}: {
  question: string;
  chatHistory: string;
}) {
  try {
    const sanitizedQuestion = question.trim().replace("\n", " ");
    const pc = new Pinecone();

    const vectorStore = await getVectorStore(pc);
    const retriever = vectorStore?.asRetriever({ verbose: true });

    const chain = RunnableSequence.from([
      {
        question: (input: { question: string; chatHistory?: string }) =>
          input.question,
        chatHistory: (input: { question: string; chatHistory?: string }) =>
          input.chatHistory ?? "",
        context: async (input: { question: string; chatHistory?: string }) => {
          try {
            const relevantDocs = await retriever?.getRelevantDocuments(
              input.question
            );
            if (relevantDocs) {
              const serialized = formatDocumentsAsString(relevantDocs);
              return serialized;
            }
          } catch (err) {
            console.log(
              "An error occurred while attempting to retrieve documents",
              err
            );
          }
        },
      },
      questionPrompt,
      streamingModel,
      new BytesOutputParser(),
    ]);

    const stream = await chain.stream({
      question: sanitizedQuestion,
      chatHistory,
    });

    return new StreamingTextResponse(stream);
  } catch (err) {
    console.log("An error occurred while attempting to invoke the chain", err);
  }
}
