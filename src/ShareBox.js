import React, { Component } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  WhatsappIcon
} from 'react-share';

class ShareBox extends Component {

  constructor(props) {
      super(props)
  }

    render() {
      const url = `https://rockwiththis.com/${this.props.slug}`

        return (
          <div className="ShareBox">
              <a href="#" className="spotifyLink"><i className="fa fa-spotify" aria-hidden="true" /></a>
              <FacebookShareButton url={url}>
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
              <TwitterShareButton url={url}>
                <TwitterIcon size={40} round={true} />
              </TwitterShareButton>
              <WhatsappShareButton url={url}>
                <WhatsappIcon size={40} round={true} />
              </WhatsappShareButton>
              <EmailShareButton url={url}>
                <EmailIcon size={40} round={true} />
              </EmailShareButton>
              <a className="smsLink" href="sms:?body=Rock with this song"><img src="http://www.rockwiththis.com/wp-content/uploads/2018/06/iconmonstr-sms-1-240.png" /></a>

          </div>
        )
    }
}


export default ShareBox
