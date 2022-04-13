import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToken } from "../redux/auth-slice";
// import { saveToken } from "../redux/auth-actions";

export default function useCreatePlaylist() {
  const BASE_URL = "https://api.spotify.com/v1";
  const getToken = new URLSearchParams(window.location.hash).get(
    "#access_token"
  );
  const [isSelected, setIsSelected] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState({
    title: "",
    description: "",
    viewPlaylist: [],
  });
  const [check, setCheck] = useState({
    emptyView: true,
    playlistId: "",
  });
  const accessToken = useSelector((state) => state.auth.token.token);
  const dispatch = useDispatch();
  // dispatch(addToken(getToken));

  let userId = "";
  let playlistId = "";
  let newPlaylistId = "";
  let responseCreate = "";

  const handleSelected = (uri) => {
    setIsSelected((oldArray) => oldArray.filter((id) => id !== uri));
    console.log(`Present id = ${isSelected}`);
  };

  const handleNotSelected = (uri) => {
    setIsSelected((oldArray) => [...oldArray, uri]);
    console.log(`Present id = ${isSelected}`);
  };

  const handleForm = (event) => {
    const { name, value } = event.target;
    setNewPlaylist({ ...newPlaylist, [name]: value });
  };

  const handlePlaylist = async (event) => {
    event.preventDefault();
    if (accessToken === null) {
      // eslint-disable-next-line no-alert
      alert("Login first");
    } else if (isSelected.length === 0) {
      alert("Select song first");
    } else {
      await getUserId();
      console.log("create playlist");
      await createPlaylist();
      newPlaylistId = playlistId.replace("spotify:playlist:", "");
      await addSongPlaylist();
      console.log(responseCreate);
      if(responseCreate === 201) {
        alert("Playlist Created");
      }
    }
  };

  const handleView = (event) => {
    event.preventDefault();
    newPlaylistId = check.playlistId.replace("spotify:playlist:", "");
    viewPlaylist();
    setCheck({
      emptyView: false,
    });
  };

  const getUserId = async () => {
    try {
      const user = await axios.get(`${BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log(user.data.id);
      userId = user.data.id;
    } catch (error) {
      console.log(error);
    }
  };

  const createPlaylist = async () => {
    try {
      const create = await axios.post(
        `${BASE_URL}/users/${userId}/playlists`,
        {
          name: newPlaylist.title,
          description: newPlaylist.description,
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
      console.log(create.data);
      playlistId = create.data.uri;
      responseCreate = create.status;
      setCheck({
        playlistId: create.data.uri,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addSongPlaylist = async () => {
    try {
      await axios.post(
        `${BASE_URL}/playlists/${newPlaylistId}/tracks`,
        {
          uris: isSelected,
          position: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const viewPlaylist = async () => {
    try {
      const view = await axios.get(`${BASE_URL}/playlists/${newPlaylistId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log(view.data);
      setNewPlaylist({
        viewPlaylist: view.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isLoggedOut = () => {
    localStorage.removeItem("isLoggedIn");
    window.location = "http://localhost:3000/";
  };

  useEffect(() => {
    dispatch(addToken(getToken));
  }, []);

  return {
    handlePlaylist,
    handleForm,
    handleNotSelected,
    handleSelected,
    isLoggedOut,
    handleView,
    newPlaylist,
    check,
    isSelected,
  };
}
