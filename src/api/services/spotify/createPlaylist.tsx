import axios from "axios";

type Data = {
    name: string,
    description: string,
    id: string 
  };

const createPlaylist = async (
  url: string | undefined,
  userId: string,
  name: string,
  description: string,
  accessToken: string
) => {
  let data;
  try {
    const create = await axios.post<Data>(
      `${url}/users/${userId}/playlists`,
      {
        name: name,
        description: description,
        public: false,
        collaborative: false,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    data = create.data;
  } catch (error) {
    console.log(error);
  }
  return data;
};

export default createPlaylist;