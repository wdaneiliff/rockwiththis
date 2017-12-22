import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

render() {

return (
      <div className="headerContainer">
        <div className="searchContainer">

        </div>
        <img id="headerLogo" src="https://rockwiththis.com/wp-content/uploads/2017/09/logo_horiz_wh.png" />
          <div class="socialLinks">
    				<a href="https://www.facebook.com/rockwiththis/"><img src="https://rockwiththis.com/wp-content/uploads/2017/10/fb-icon.png" alt="" /></a>
    				<a href="https://twitter.com/RockWthThis"><img src="https://rockwiththis.com/wp-content/uploads/2017/10/twitter.png" alt="" /></a>
    				<a href="https://soundcloud.com/rockwiththis/sets/rock-with-this"><img src="https://rockwiththis.com/wp-content/uploads/2017/10/sc.png" alt="" /></a>
    				<a href="https://open.spotify.com/user/jaredp21/playlist/2eWK5PGSTEl8I5ZvMG5VPS"><img src="https://rockwiththis.com/wp-content/uploads/2017/10/spotify.png" alt="" /></a>
    			</div>
      </div>
    )
  }
}
export default Header;
