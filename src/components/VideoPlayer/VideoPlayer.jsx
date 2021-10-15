import React from "react";
import { Paper, Typography } from "@mui/material";

const VideoPlayer = (props) => {
  const video = props.video;
  console.log(video);

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    // <h1>Stop</h1>
    <React.Fragment>
      <Paper elevation={6} style={{ height: "100%" }}>
        <iFrame
          frameBorder="3px"
          height="100%"
          width="100%"
          title="Video Player"
          src={videoSrc}
        />
      </Paper>
      <Paper elevation={6} style={{ padding: "15px" }}>
        <Typography variant="h3">{video.snippet.title} </Typography>
        <Typography variant="subtitle1"> {video.snippet.description} - {video.snippet.channelId}</Typography>
        <Typography variant="subtitle2"> {video.snippet.publishedAt}</Typography>
      </Paper>
    </React.Fragment>
  );
};

export default VideoPlayer;
