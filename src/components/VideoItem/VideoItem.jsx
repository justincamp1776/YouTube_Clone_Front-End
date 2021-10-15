import react from 'react';

import {Grid, Paper, Typography} from '@mui/material'

const VideoItem = (props)=>{

    const video = props.video
    const onVideoSelect = props.onVideoSelect

    return(
        <Grid item xs={12}>
            <Paper style={{display:'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => onVideoSelect(video)}>
            <img style={{maringRight: '20px'}} alt="thumbnail" src={video.snippet.thumbnails.medium.url}/>
            <Typography variant="subtitle1"><b>{video.snippet.title}</b></Typography>
            </Paper>
        </Grid>
    );
}
export default VideoItem;