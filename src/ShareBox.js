import React, { Component } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';

class ShareBox extends Component {

  constructor(props) {
      super(props)
  }

    render() {
      const url = `https://rockwiththis.com/${this.props.slug}`

        return (
          <div className="ShareBox">
              <a className="shareButton"><img src="http://rockwiththis.com/wp-content/uploads/2018/01/iconmonstr-share-2-48.png" /></a>
              <a href="#" className="spotifyLink"><i className="fa fa-spotify" aria-hidden="true" /></a>
              <FacebookShareButton url={url}>
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
              <TwitterShareButton url={url}>
                <TwitterIcon size={40} round={true} />
              </TwitterShareButton>
          </div>
        )
    }
}


export default ShareBox
