import React, { Component } from "react";
import { render } from "react-dom";

import Autocomplete from "./Autocomplete";

require("./App.css");


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5ba8efb23100007200c2750c').then(response =>
      response.json()
    ).then(response => {
      console.log(response)
      this.setState({
        data: response
      })
    })
  }

  render() {


    return (
      <div className="container">
        <h1>Search for Users!</h1>
        <h2>Start typing </h2>
        <Autocomplete
          suggestions={this.state.data}
        />
      </div>
    );
  }
}
export default App
