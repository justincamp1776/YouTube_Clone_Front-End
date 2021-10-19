import React, { useState, useEffect } from "react";
import axios from "axios";
import NewComment from "../NewComment/NewComment";
import Button from "@mui/material/Button";
import Reply from '../Reply/Reply';
import DialogComment from "../DialogComment/DialogComment";


const Comment = (props) => {
  const [comments, setComments] = useState([]);


  useEffect(() => {
    fetchAllComments();
  }, [props]);

  const fetchAllComments = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/comments/video/${props.video.id.videoId}`
    );
    setComments(response.data);
    console.log("fetchComments:", comments);
  };


  const postComment = async (newPost) => {
    console.log("post request:", newPost);
    const response = await axios.post(
      "http://127.0.0.1:8000/comments/",
      newPost
    );
    if (newPost.videoId == undefined) {
      alert("Video ID unavailable. Please comment on another video");
    }
    fetchAllComments();
    return response.status;
  };

  const likeComment = async (pk) => {
    console.log("Like Function:", pk);
    const response = await axios.patch(`http://127.0.0.1:8000/comments/${pk}`);
    fetchAllComments();
    return response.status;
  };

  const dislikeComment = async (pk) => {
    console.log("Dislike Function:", pk);
    const response = await axios.put(`http://127.0.0.1:8000/comments/${pk}`);
    fetchAllComments();
    return response.status;
  };

  return (

    <div className="comments" >
    <ul >
      {/* <NewComment postComment={postComment} video={props.video} /> */}
      <DialogComment postComment={postComment} video={props.video} />
      {console.log(props.video.id.videoId)}
      {console.log("return:", comments)}
      {setComments != null &&
        comments.map((comment) => {
          return (
            <li style={{color:"white", fontFamily: "monospace", fontSize: "15pt"}}>
              {comment.text}{" "}
              <Button onClick={() => likeComment(comment.id)}>Like</Button>{" "}
              {comment.likes}{" "}
              <Button onClick={() => dislikeComment(comment.id)}>
                Dislike
              </Button>{" "}
              {comment.dislikes}
              <Reply commentId={comment.id} />
            </li>
          );
        })}
    </ul>
    </div>
  );
};

export default Comment;
