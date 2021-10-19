import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import react, {useState, useEffect} from 'react';

export default function DialogReply(props){

    const [open, setOpen] = React.useState(false);
    const [text, setText] = useState('');
    const [commentId, setCommentId] = useState();
   

    console.log("commentIdState:", commentId, text)
    const handleOpen =()=>{
        setOpen(true);
    }

 
    const handleClose =() =>{
        setOpen(false);
    }

    const handleChange = (event) =>{  
        setCommentId(props.commentId)    
        setText(event.target.value)
        console.log("handleChange:", text, commentId)
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        let newPost = {text : text, comment : commentId}
        props.postReply(newPost)
        handleClose();
    }

    return(
        <div>
            <Button variant="outlined" onClick={handleOpen}>
                Reply
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Reply to Comment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To reply to a comment, please enter your text here.
                    </DialogContentText>
                    <TextField 
                    autoFocus
                    margin="dense"
                    label="text"
                    name=""
                    onChange={handleChange}
                    fullWidth
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