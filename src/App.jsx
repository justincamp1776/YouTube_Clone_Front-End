import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import { Grid } from '@mui/material';
import SearchBar from './components/SearchBar/SearchBar'
import VideoPlayer from './components/VideoPlayer/VideoPlayer';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  getVideoSearch  = async (searchTerm) =>{
    
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search',{
      params : {
        part : 'snippet',
        maxResults : 5,
        key : 'AIzaSyDCLA0aiIGqpWK8-alDjxOQn0XmE30FLfU',
        q : searchTerm,     
      }
    });
    console.log(response.data.items)
  }

  render() { 
    return (  
      <Grid justifyContent="center" container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar formSubmission={this.getVideoSearch}/>
            </Grid>
            <Grid item xs={8}>
              <VideoPlayer />
            </Grid>
            <Grid item xs={4}>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
 
export default App;