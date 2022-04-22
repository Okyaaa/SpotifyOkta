import { useEffect, useState } from "react";
import releaseApi from "../api/services/spotify/newRelease";
import { useSelector } from "react-redux";
import { selectData } from "../redux/auth-slice";

export default function NewRelease() {
  const accessToken = useSelector(selectData);
  const url = "https://api.spotify.com/v1/browse/new-releases";
  const [song, setSong] = useState<Array<Object> | undefined>([]);

  useEffect(() => {
    releaseApi(url, accessToken.value).then((response) => {
      setSong(response);
    });
  }, []);

  return {
    song,
  };
}
