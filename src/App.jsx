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
      selectedVideo: null,
    };
  }

  componentDidMount = () =>{
    this.getDefaultVideo();
  }


  getDefaultVideo = async () =>{
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search", {
        params : {
          id : '3VQcDPq4FlY',
          part : 'snippet',
          key :  " AIzaSyAXDq7ius4ODeCMYz12YhdouIn-pHK8Rp4",
        }
      }
    )
    this.setState({
      selectedVideo : response.data.items[0],
    })
    this.getRelatedVideos();
    console.log('componentDidMount:', response.data.items[0])
  }

  // The function below is used as an onSelect Callback in VideoItem
   onVideoSelect = (video) => {
    this.setState({
      selectedVideo: video
    });
  }

  // This function queries youtube database using the searchTerm provided in the search bar
  getVideoSearch = async (searchTerm) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          maxResults: 50,
          key: " AIzaSyAXDq7ius4ODeCMYz12YhdouIn-pHK8Rp4",
          q: searchTerm,
        },
      }
    );
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[1],
    });
    console.log(this.state.selectedVideo);
  };


  // Provides a list of 50 related videos
  getRelatedVideos = async () => {
    const videoId = this.state.selectedVideo.id.videoId
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params : {
        part : 'snippet',
        relaterelatedToVideoId : videoId,
        maxResults : 50,
        key : " AIzaSyAXDq7ius4ODeCMYz12YhdouIn-pHK8Rp4"
      },
    })
    this.setState({
      videos : response.data.items
    })
  };

  render() {
    return (
     
      <Grid justifyContent="center" container spacing={10} className="background-color">
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar formSubmission={this.getVideoSearch} />
            </Grid>
            <Grid item xs={8}>
                <a id="videoPlayer">VideoPlayer</a>
              {console.log("Before Video Comp:", this.state.selectedVideo)}
              {this.state.selectedVideo !== null && <VideoPlayer video={this.state.selectedVideo} />}
              {this.state.selectedVideo !== null && <Comment video={this.state.selectedVideo} />}
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
