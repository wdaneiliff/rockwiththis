import React, { Component } from 'react';
import styles from './Homepage.css';
import SongsContainer from './SongsContainer.js';
import Sidebar from './Sidebar.js';

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      songs: []
    }
  }
componentDidMount() {
    let dataURL = "https://rockwiththis.com/wp-json/wp/v2/songs?_embed[posts_per_page]=-1";
    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          songs: res
        })
      })
  }

render() {
  const { songs } = this.state;

return (
  <div className="homeContainer">
    <SongsContainer songs={songs}/>
    <Sidebar />
  </div>
    )
  }
}
export default Homepage;
