import axios from "axios";

export const creatFile = async (
  clientID: Number,
  name: string,
  path: string
) => {
  console.log(`http://localhost:10001/file/create`);
  try {
    const res = await axios.post(
      `http://localhost:10001/file/create`,

      {
        clientID: clientID,
        name: name,
        path: path,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
