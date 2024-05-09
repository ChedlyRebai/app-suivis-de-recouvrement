import { File } from "@/Models/file.model";
import axios from "axios";

export const creatFile = async (
  clientID: Number,
  name: string,
  path: string
): Promise<File> => {
  console.log(`http://localhost:10001/file/create`);
  try {
    const res = await axios.post<File>(
      `http://localhost:10001/file/create`,

      {
        clientID: clientID,
        name: name,
        path: path,
      }
    );
    return (res.data as File) || ({} as File);
  } catch (error) {
    console.log(error);
    return {} as File;
  }
};

export const getAllfilesById = async (clientID: Number): Promise<File[]> => {
  console.log(`http://localhost:10001/file/ALL?id=${clientID}`);
  try {
    const res = await axios.get<File[]>(
      `http://localhost:10001/file/all?id=${clientID}`
    );
    return (res.data as File[]) || ({} as File[]);
  } catch (error) {
    console.log(error);
    return {} as File[];
  }
};
