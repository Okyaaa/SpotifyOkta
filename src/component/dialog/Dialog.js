import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PlaylistForm from "../playlistForm/playlistForm";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    handlePlaylist,
    handleForm,
    handleNotSelected,
  } = useCreatePlaylist();

  return (
    <div>
      <button variant="outlined" onClick={handleClickOpen}>
        {props.buttonName}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{fontWeight: 500, fontSize: 24}}>{props.title}</DialogTitle>
        <DialogContent>
          {props.component}
        </DialogContent>
      </Dialog>
    </div>
  );
}
