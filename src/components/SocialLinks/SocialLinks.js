import React, { Component } from 'react'
/* eslint-disable */

class SocialLinks extends Component {

    render() {
        return (
          <div className={`socialLinks ${location.pathname == "/submit" ? 'submit' : ''}`}>
            <ul>
            <li><a target="_blank" href="https://open.spotify.com/user/jaredp21/playlist/2eWK5PGSTEl8I5ZvMG5VPS"><i className="im im-spotify"></i></a></li>
            <li className="sc"><a target="_blank" href="https://soundcloud.com/rockwiththis/sets/rock-with-this"><i className="im im-soundcloud"></i></a></li>
            <li className="insta"><a target="_blank" href="https://www.instagram.com/rockwiththismusic/"><i className="im im-instagram"></i></a></li>
            <li><a target="_blank" href="https://www.facebook.com/rockwiththis/"><i className="im im-facebook"></i></a></li>

            </ul>
          </div>
        )
    }
}


export default SocialLinks
