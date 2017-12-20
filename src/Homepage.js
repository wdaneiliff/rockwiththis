import React, { Component } from 'react';
class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      songs: []
    }
  }
componentDidMount() {
    let dataURL = "https://rockwiththis.com/wp-json/wp/v2/songs?_embed";
    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          songs: res
        })
      })
  }
render() {
    let songs = this.state.songs.map((song, index) => {
      return (
        <div key={index}>
          <p><strong>Post Title:</strong>{song.title.rendered}</p>
          <p><strong>Song Name:</strong>{song.acf.song_name}</p>
          <p><strong>Artist Name:</strong>{song.acf.artist_name}</p>
          <p><strong>Description:</strong>{song.content.rendered}</p>
        </div>
      )
    });
return (
      <div>
        <h2>Rock With This</h2>
          {songs}
      </div>
    )
  }
}
export default Homepage;
