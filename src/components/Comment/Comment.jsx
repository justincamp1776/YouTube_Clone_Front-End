import React, { useState, useEffect } from "react";
import axios from "axios";
import NewComment from "../NewComment/NewComment";
import Reply from '../Reply/Reply';
import DialogComment from "../DialogComment/DialogComment";

const Comment = (props) => {
  const [comments, setComments] = useState([]);
  const [channelComments, setChannelComments] = useState([]);

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

  const fetchCommentsWithoutVideoId = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/comments/video/${props.video.id.channelId}`
    );
    console.log("channelComments:", response.data);
    setChannelComments(response.data);
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
    <ul>
      {/* <NewComment postComment={postComment} video={props.video} /> */}
      <DialogComment postComment={postComment} video={props.video} />
      {console.log(props.video.id.videoId)}
      {console.log("return:", comments)}
      {setComments != null &&
        comments.map((comment) => {
          return (
            <li>
              {comment.text}{" "}
              <button onClick={() => likeComment(comment.id)}>Like</button>{" "}
              {comment.likes}{" "}
              <button onClick={() => dislikeComment(comment.id)}>
                Dislike
              </button>{" "}
              {comment.dislikes}
              <Reply commentId={comment.id} />
            </li>
          );
        })}
      {setChannelComments != null &&
        channelComments.map((channelComments) => {
          return <li>{channelComments.text}</li>;
        })}
    </ul>
  );
};

export default Comment;
