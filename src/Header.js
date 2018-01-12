import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

render() {

return (
      <div className="headerContainer">
        <button className="filterButton">
          Filters +
        </button>
        <div className="filtersContainer">
        </div>
        <img id="headerLogo" src="https://rockwiththis.com/wp-content/uploads/2017/09/logo_horiz_wh.png" />
          <div className="socialLinks">
    				<a target="_blank" href="https://www.facebook.com/rockwiththis/"><i class="fa fa-facebook-square" aria-hidden="true"></i></a>
    				<a target="_blank" href="https://soundcloud.com/rockwiththis/sets/rock-with-this"><i class="fa fa-soundcloud" aria-hidden="true"></i></a>
    				<a target="_blank" href="https://open.spotify.com/user/jaredp21/playlist/2eWK5PGSTEl8I5ZvMG5VPS"><i class="fa fa-spotify" aria-hidden="true"></i>

    				</a>
    			</div>
      </div>
    )
  }
}
export default Header;
