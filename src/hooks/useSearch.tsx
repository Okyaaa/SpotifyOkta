import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { selectData } from "redux/auth-slice";
import searchSong from "../api/services/spotify/searchSong";

export default function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Object | undefined>([]);
  const url = "https://api.spotify.com/v1/search";
  const accessToken = useSelector(selectData);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (accessToken !== "") {
      searchSong(url, searchQuery, accessToken.value)
        .then(response => {
          setSearchResult(response?.data.tracks.items);
        });
    } else {
      alert("Login first");
    }
    event.preventDefault();
  };

  return {
    searchResult,
    handleChange,
    onSearch,
  };
}
