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
        limit: 24,
      },
    });
    data = result.data.albums.items;
  } catch (error) {
    console.log(error);
  }
  return data;
};

export default newRelease;
