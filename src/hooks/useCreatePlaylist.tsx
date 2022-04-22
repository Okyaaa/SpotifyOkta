import addSongPlaylist from "api/services/spotify/addSong";
import createPlaylist from "api/services/spotify/createPlaylist";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedSong, unSelect, selectData } from "../redux/auth-slice";

type NewPlaylist = {
  title: string;
  description: string;
  viewPlaylist: Array<string>;
};

export default function useCreatePlaylist() {
  const [newPlaylist, setNewPlaylist] = useState<NewPlaylist>({
    title: "",
    description: "",
    viewPlaylist: [],
  });
  const dispatch = useDispatch();
  const accessToken = useSelector(selectData);

  let playlistId: string | undefined = "";
  let responseCreate: number | undefined = 0;

  const handleSelected = (uri: string) => {
    dispatch(unSelect(uri));
  };

  const handleNotSelected = (uri: string) => {
    dispatch(selectedSong(uri));
  };

  const handleForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPlaylist({ ...newPlaylist, [name]: value });
  };

  const handlePlaylist = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (accessToken.value === null) {
      // eslint-disable-next-line no-alert
      alert("Login first");
    } else if (accessToken.trackId.length === 0) {
      alert("Select song first");
    } else {
      await createPlaylist(
        process.env.REACT_APP_SPOTIFY_URL,
        accessToken.userId,
        newPlaylist.title,
        newPlaylist.description,
        accessToken.value
      ).then((response) => {
        playlistId = response?.id;
      });
      await addSongPlaylist(
        process.env.REACT_APP_SPOTIFY_URL,
        playlistId,
        accessToken.trackId,
        accessToken.value
      ).then((response) => {
        responseCreate = response;
      });
      if (responseCreate === 201) {
        alert("Playlist Created");
      }
    }
  };

  // const handleView = (event:ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   newPlaylistId = check.playlistId.replace("spotify:playlist:", "");
  // };

  const isLoggedOut = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "http://localhost:3000/";
  };

  return {
    handlePlaylist,
    handleForm,
    handleNotSelected,
    handleSelected,
    isLoggedOut,
    newPlaylist,
  };
}
