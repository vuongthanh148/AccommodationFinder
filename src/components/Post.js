import react, { Component } from "react";
import reactDOM from "react-dom";

class Post extends Component {
  render() {
    return (
        <div>
          <h1>Make a new Post</h1>
          {/* <Switch>
            <Route path="/">
              <Home changeScreenState={this.changeScreenState} />
            </Route>
          </Switch> */}
        </div>
    );
  }
}

export default Post;
