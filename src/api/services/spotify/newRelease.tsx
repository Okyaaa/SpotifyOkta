import axios from "axios";

type release = {
  albums: {
    items: Array<Object>
  };
};

const newRelease = async (
  url: string,
  accessToken: string
) => {
  let data;
  try {
    const result = await axios.get<release>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 20,
      },
    });
    data = result.data.albums.items;
  } catch (error) {
    console.log(error);
  }
  console.log("at api", data);
  return data;
};

export default newRelease;
