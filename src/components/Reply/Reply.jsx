import axios from "axios";
import React, {useState, useEffect} from "react";
import NewReply from "../NewReply/NewReply";

const Reply = (props) => {
  const [replies, setReply] = useState([]);



    useEffect(() =>{
        fetchReply();
    }, [props]);


  const postReply = async (newPost) => {
    console.log("PostReply:", newPost);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/comments/reply/`,
        newPost
      );
      fetchReply();
      console.log("postReply:", response, response.status);
      return response.status;
    } catch (err) {
      console.log("Unable to post a reply", err);
    }
  };


  const fetchReply = async () =>{
      try{
        const response = await axios.get(`http://127.0.0.1:8000/comments/reply/${props.commentId}`)
        console.log("fetchReply:", response.data)
        setReply(response.data)
      } catch{
          console.log("Error")
      }
  }

  return (
    <div>
      {setReply != null && replies.map((reply)=>{
          return(
              <ul>
                  <li>{reply.text}</li>
              </ul>
          );
      })}
      <NewReply commentId={props.commentId} postReply={postReply} />
      {console.log("reply:", props.commentId)}
    </div>
  );
};

export default Reply;
