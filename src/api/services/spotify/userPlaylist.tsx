import axios from "axios";

type release = {
  items: Object[]
};
const userPlaylist = async (url: string, accessToken: string) => {
  let data;
  try {
    const result = await axios.get<release>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 10,
      },
    });
    data = result.data.items;
    console.log(data)
  } catch (error) {
    console.log(error);
  }
  return data;
};

export default userPlaylist;
