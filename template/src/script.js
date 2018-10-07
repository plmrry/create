import { h, render, Component } from "preact";

class App extends Component {
  render() {
    return <div>fuck</div>;
  }
}

const appDiv = document.getElementById("app");

render(<App />, appDiv);
