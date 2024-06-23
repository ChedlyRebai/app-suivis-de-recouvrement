function getEnv(variable: string) {
  const value = process.env[variable];
  if (!value) {
    throw new Error(`${variable} enviroment variable not set`);
  }
  return value;
}

function validateEnviromentVariables() {
  getEnv("PINECONE_API_KEY");
  getEnv("PINECONE_INDEX");
  getEnv("PINECONE_CLOUD");
  getEnv("PINECONE_REGION");
  getEnv("LANGCHAIN_API_KEY");
  getEnv("LANGCHAIN_TRACING_V2");
}

export { getEnv, validateEnviromentVariables };
