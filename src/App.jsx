import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Grid } from "@mui/material";
import SearchBar from "./components/SearchBar/SearchBar";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import VideoList from './components/VideoList/VideoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
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
          key: "AIzaSyDCLA0aiIGqpWK8-alDjxOQn0XmE30FLfU",
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
