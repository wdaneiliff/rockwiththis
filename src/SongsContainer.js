import React, { Component } from 'react';
import styles from './SongsContainer.css';

class SongsContainer extends Component {

render() {
    let songs = this.props.songs.map((song, index) => {
      return (
        <div className="songContainer" key={index}>
          <div className="imageContainer">
            <img className="songImage" src={song._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url} />
          </div>
          <div className="postContent" >
            <div className="topContentContainer">
              <div className="songInfo">
                <p className="postTitle" dangerouslySetInnerHTML={ {__html: song.title.rendered} }/>
                <p className="postAuthor">By {song._embedded.author[0].name}</p>
              </div>
            </div>
            <div className="singlePostPlayer">
              <button className="singlePostPlayerButton"/>
              <div className="singlePostPlayerInfo">
                <p className="songName"><strong>Song Name</strong>{song.acf.song_name}</p>
                <p className="artistName"> by <strong>Artist Name</strong>{song.acf.artist_name}</p>
              </div>
            </div>
            <div className="bottomContentContainer">
              <p className="songDescription" dangerouslySetInnerHTML={ {__html: song.content.rendered} } />
            </div>
          </div>
        </div>
      )
    });
return (
  <div className="songsContainer">
      {songs}
  </div>
    )
  }
}
export default SongsContainer;
