import React from 'react';
import { Paper, Typography } from '@mui/material'

const VideoPlayer = (props) => {

    const video = props.video

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`

    console.log(video)

    return (  
        // <h1>Stop</h1>
        <React.Fragment>
            <Paper elevation={6} style={{height:'70%'}}>
                <iFrame frameBorder="0" height="100%" width="100%" title="Video Player" src={videoSrc}/>
            </Paper>
            <Paper elevation={6} style={{padding: '15px'}}>
                <Typography variant="h1" src={video.snippet.title}></Typography>
                <Typography variant="subtitle1" src={video.snippet.description}></Typography>
            </Paper>
        </React.Fragment>
    
    );
}

export default VideoPlayer;