import axios from "axios";

type Data = {
  items: Array<Object>
};

const recentlyPlayed = async (url:string, accessToken:string) => {
  let data;
  try {
    const user = await axios.get<Data>(`${url}/me/player/recently-played`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    data = user.data.items;
  } catch (error) {
    console.log(error);
  }
  return data;
};

export default recentlyPlayed;
