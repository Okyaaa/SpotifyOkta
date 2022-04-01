import { useEffect, useState } from "react";
import axios from "axios";

export default function useSearch() {
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [savedToken, setSavedToken] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const onSearch = (event) => {
    if (isLoggedIn === true && savedToken != null) {
      axios
        .get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
          params: {
            q: `${searchQuery}`,
            type: "track",
          },
        })
        .then((response) => {
          const data = response.data.tracks.items;
          console.log(data);
          setSearchResult(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Login first");
    }
    event.preventDefault();
  };

  useEffect(() => {
    const access_token = new URLSearchParams(window.location.hash).get(
      "#access_token"
    );
    setSavedToken(access_token);
    setIsLoggedin(true);
  }, []);

  return {
    searchResult,
    handleChange,
    onSearch,
  };
}
