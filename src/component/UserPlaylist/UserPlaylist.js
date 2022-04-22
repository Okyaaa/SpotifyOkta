import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import userPlaylist from "api/services/spotify/userPlaylist";
import { useSelector } from "react-redux";
import { selectData } from "redux/auth-slice";

export default function UserPlaylist() {
  const data = useSelector(selectData);
  console.log(data.value);
  const url = `${process.env.REACT_APP_SPOTIFY_URL}/users/${data.userId}/playlists`;
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    userPlaylist(url, data.value).then((response) => {
      setPlaylist(response);
      console.log(response);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableBody>
          {playlist.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img
                  style={{ width: 70, heigh: 70, borderRadius: 4 }}
                  src={item.images[0].url}
                ></img>
              </TableCell>
              <TableCell component="th" scope="row">
                <div>
                  <div style={{fontWeight: 500, fontSize: 24}}>{item.name}</div>
                  <div>{item.description}</div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
