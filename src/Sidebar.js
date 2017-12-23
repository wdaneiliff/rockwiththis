import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {

render() {

return (
      <div className="sidebar">
        <div className="topTrackContainer">
          <h3>Top Tracks</h3>
          <p>Dive a bit deeper. Explore top tracks we've featured in the past.</p>
        </div>
        <div className="newsletterContainer">
          <h3>Heads up</h3>
          <p>Expand your mind with new music and concert updates around the area.</p>
        </div>
      </div>
    )
  }
}
export default Sidebar;
