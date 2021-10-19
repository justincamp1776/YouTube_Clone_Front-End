import React, { Component } from "react";

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      videoId: this.props.video.id.videoId,
    };
  }

  handleChange = (event) => {
    console.log('object:', this.props.video)
    console.log("videoId:", this.state.videoId)
    if(this.state.videoId == undefined){
      console.log("ChannelId:", this.props.video.id.channelId)
      this.setState({
        videoId : this.props.video.id.channelId,
        [event.target.name] : event.target.value,
      })
      console.log("Conditional:", this.state.videoId)
    }else if( this.state.videoId !== undefined){
      this.setState({
        videoId : this.props.video.id.videoId,
        [event.target.name] : event.target.value,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.props);
    console.log("handleSubmit:", this.props.videoId, this.state);
    this.props.postComment(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>New Comment</label>
        <input
          name="text"
          onChange={this.handleChange}
          value={this.state.text}
        />
        <button type="Submit">Comment</button>
      </form>
    );
  }
}

export default NewComment;
