import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Grid } from "@mui/material";
import SearchBar from "./components/SearchBar/SearchBar";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import VideoList from './components/VideoList/VideoList';
import Comment from './components/Comment/Comment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
  }

  componentDidMount = () =>{
    this.getDefaultVideo();
    this.getAllComments();
  }


  getDefaultVideo = async () =>{
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search", {
        params : {
          id : 'Q7Z5Bx-Zh38',
          part : 'snippet',
          key :  "AIzaSyClXssQfxMQseOYoRVYcS33Os5_SLzWcO8",
        }
      }
    )
    this.setState({
      selectedVideo : response.data.items[0],
    })
    this.getRelatedVideos();
    console.log('componentDidMount:', response.data.items[0])
  }

  getAllComments = async () =>{
    const response = await axios.get('http://127.0.0.1:8000/comments/');
    console.log('comments:', response.data);
    return response.data.data
  }
  

  onVideoSelect = (video) => {
    this.setState({
      selectedVideo: video
    });
  }

  getVideoSearch = async (searchTerm) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          maxResults: 5,
          key: "AIzaSyClXssQfxMQseOYoRVYcS33Os5_SLzWcO8",
          q: searchTerm,
        },
      }
    );
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
    console.log(this.state.selectedVideo);
  };

  getRelatedVideos = async () => {
    const videoId = this.state.selectedVideo.id.videoId
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params : {
        part : 'snippet',
        relatedTo : videoId,
        maxResults : 20,
        key : "AIzaSyClXssQfxMQseOYoRVYcS33Os5_SLzWcO8"
      },
    })
    this.setState({
      videos : response.data.items
    })
  };

  render() {
    return (
     
      <Grid justifyContent="center" container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar formSubmission={this.getVideoSearch} />
            </Grid>
            <Grid item xs={8}>
              {console.log("Before Video Comp:", this.state.selectedVideo)}
              {this.state.selectedVideo !== null && <VideoPlayer video={this.state.selectedVideo} />}
              <Comment />
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
    );
  }
}

export default App;
