import React, {Component} from 'react';
import './App.css';
import TitleBar from './components/TitleBar/TitleBar'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (  
      <div>
        <div className="container-fluid">
           <TitleBar/>
        </div>
        

      </div>
    );
  }
}
 
export default App;