import React, { Component } from 'react';
import './MainPlayer.css';

class MainPlayer extends Component {

render() {

return (
    <footer>
      <div className="footer-player">
        <div className="player-info">
          <div className="player-info-image-wrapper">
            <div className="player-image">
              <img src="https://rockwiththis.com/wp-content/uploads/2017/11/In_Rainbows_Official_Cover.jpg" alt="" />
            </div>
          </div>
          <p className="artist-info">
            <span className="song-title">Weird Fishes</span> <br/>
            <span className="artist-title">Radiohead</span>
          </p>
        </div>
        <div className="player-controls-wrapper">
          <div className="player-controls">
            <div className="player-controls-buttons">
              <div id="player-control-button-back" className="player-control-button"><i class="fa fa-step-backward" aria-hidden="true"></i></div>
              <div id="player-control-button-play" className="player-control-button"><i class="fa fa-play-circle-o" aria-hidden="true"></i></div>
              <div id="player-control-button-next" className="player-control-button"><i class="fa fa-step-forward" aria-hidden="true"></i></div>
            </div>
            <div className="player-duration-bar-wrapper">
              <div className="player-duration-bar-current-time">00:00</div>
              <div className="player-duration-bar">
                <div className="rc-slider">
                  <div className="rc-slider-rail"></div>
                  <div className="rc-slider-track"></div>
                  <div className="rc-slider-step"></div>
                  <div className="rc-slider-handle"></div>
                  <div className="rc-slider-mark"></div>
                </div>
              </div>
              <div className="player-duration-bar-song-duration">00:00</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    )
  }
}
export default MainPlayer;
