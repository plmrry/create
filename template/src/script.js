import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {
  render() {
    return <div>fuck</div>;
  }
}

const appDiv = document.getElementById("app");

render(<App />, appDiv);
