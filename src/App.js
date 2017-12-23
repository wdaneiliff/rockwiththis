import React, { Component } from 'react';
import Homepage from './Homepage.js';
import Header from './Header.js';
import MainPlayer from './MainPlayer.js';

class App extends Component {
  render() {
    return (
    <div>
      <Header />
      <Homepage />
      <MainPlayer />
    </div>
    );
  }
}

export default App;
