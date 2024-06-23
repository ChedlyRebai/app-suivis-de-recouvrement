import { getEnv } from "@/utils/env-utils";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";

export async function getVectorStore(pineconeClient: Pinecone) {
  try {
    const index = pineconeClient.Index(getEnv("PINECONE_INDEX"));
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({
        modelName: "text-embedding-3-large",
        dimensions: 256,
      }),
      {
        pineconeIndex: index,
        textKey: "text",
      }
    );

    return vectorStore;
  } catch (err) {
    console.log(
      "An error occurred while attempting to get the vector store",
      err
    );
  }
}
