import axios from "axios";

type Data = {
  item: {
    artists: Array<Object>,
    name: string,
    album: {
        images: Array<Object>
    }
  }
};

const currentlyPlaying = async (url:string, accessToken:string) => {
  let data;
  try {
    const user = await axios.get<Data>(`${url}/me/player/currently-playing`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    data = user.data.item;
  } catch (error) {
    console.log(error);
  }
  return data;
};

export default currentlyPlaying;
