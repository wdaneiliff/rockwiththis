import React, { Component } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';

class ShareBox extends Component {

    render() {
      const url = 'www.google.com'

        return (
          <div className="ShareBox">
              <a className="shareButton"><img src="http://rockwiththis.com/wp-content/uploads/2018/01/iconmonstr-share-2-48.png" /></a>
              <a href="#" className="spotifyLink"><i className="fa fa-spotify" aria-hidden="true" /></a>
              <FacebookShareButton url={url}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <TwitterShareButton url={url}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
          </div>
        )
    }
}


export default ShareBox
