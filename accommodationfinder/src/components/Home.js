import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log('did it mount?');
    //Request all needed data
  }
  render() {
    return (
      // <Navbar />,
      <div className="App">
        <h1>This is Home</h1>
          
      </div>
    );
  }
}

export default Home;
