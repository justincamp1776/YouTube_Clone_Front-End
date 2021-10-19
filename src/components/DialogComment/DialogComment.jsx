import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import react, { useState } from "react";

export default function DialogComment(props) {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = useState('');
    const [videoId, setVideoId] = useState();



    const handleOpen = () =>{
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false);
    }


    const handleChange = (event) =>{
        setText(event.target.value)
        setVideoId(props.video.id.videoId)
        console.log("handleChange:", text, videoId)
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        let newPost = {text : text, videoId : videoId}
        console.log("onSubmit:", newPost)
        props.postComment(newPost);
        handleClose();
    }



  return (
    <div>
      <Button variant="outlined"onClick={handleOpen}>Post A Comment Here</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Post a comment, enter your text here. Please refrain from
            swearing or sharing obscenties. I have worked very hard on this
            project :)
          </DialogContentText>
          <TextField 
          autoFocus
          margin="dense"
          name = "text"
          label = "text"
          fullWidth
          onChange={handleChange}
          variant="standard"
          />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
