import React from 'react';
import VideoItem from '../VideoItem/VideoItem'
import {Grid, Paper, Typography} from '@mui/material';



const VideoList = (props)=>{
    console.log(props.videos)
    const listOfVideos = props.videos.map((video, id)=> <VideoItem onVideoSelect={props.onVideoSelect} key={id} video={video}/>)

    return(
        <Grid container spacing={10}>
            {listOfVideos}
        </Grid>
    );
}
export default VideoList;