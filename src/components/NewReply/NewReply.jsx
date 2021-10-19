import React, {Component} from 'react';

class NewReply extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            text : '',
            comment : this.props.commentId,
         }
    }


    handleChange = (event) =>{
        console.log("handleChange:", this.state)
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) =>{
        console.log("handleSubmit:", this.state)
        event.preventDefault();
        this.props.postReply(this.state)
    }



    render() { 
        return (  
            <form onSubmit={this.handleSubmit}>
                <label>Reply:</label>
                    <input name="text" onChange={this.handleChange} value={this.state.text} />
                <button type="Submit">Reply</button>
            </form>
        );
    }
}
 
export default NewReply;