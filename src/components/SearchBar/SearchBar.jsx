import { Paper, TextField } from '@mui/material';
import react, {Component} from 'react'

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchTerm : '',
        }
    }    

    handleChange = (event) =>{
        this.setState({
            searchTerm : event.target.value
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.formSubmission(this.state)
    }
  
    render() { 
        return (  
            <Paper elevation={6} style={{padding:'25px', backgroundColor: "black", color: "white"}}>
            <form onSubmit={this.handleSubmit} style={{backgroundColor: "white"}}>
                <TextField fullWidth label="Search for..." onChange={this.handleChange}></TextField>
            </form>
            </Paper>
        );
    }
}
 
export default SearchBar;