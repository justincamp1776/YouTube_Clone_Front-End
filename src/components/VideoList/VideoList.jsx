import React from 'react';
import VideoItem from '../VideoItem/VideoItem'
import {Grid, Paper, Typography} from '@mui/material';



const VideoList = (props)=>{
    console.log(props.videos)
    const listOfVideos = props.videos.map((video, id)=> <VideoItem key={id} video={video}/>)

    return(
        <h1>{listOfVideos}</h1>
    );
}
export default VideoList;