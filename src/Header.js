import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {

render() {

return (
      <div className="headerContainer">
        <div className="filtersContainer">
        </div>
        <Link id="headerLogo" to="/"><img src="https://rockwiththis.info/wp-content/uploads/2017/09/logo_horiz_wh.png" /></Link>
          <div className="socialLinks">
    				<a target="_blank" href="https://www.facebook.com/rockwiththis/"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
    				<a target="_blank" href="https://www.instagram.com/rockwiththismusic/"><i className="fa fa-instagram" aria-hidden="true"></i></a>
    				<a target="_blank" href="https://open.spotify.com/user/jaredp21/playlist/2eWK5PGSTEl8I5ZvMG5VPS"><i className="fa fa-spotify" aria-hidden="true"></i></a>
            <a target="_blank" href="https://soundcloud.com/rockwiththis/sets/rock-with-this"><i className="fa fa-soundcloud" aria-hidden="true"></i></a>

    			</div>
      </div>
    )
  }
}
export default Header;
