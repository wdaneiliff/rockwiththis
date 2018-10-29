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

import './ShareBox.scss'

class ShareBox extends Component {

  constructor(props) {
      super(props)


      this.state = {
        showShareDropdown: false
      }

      this.showShareDropdown = this.showShareDropdown.bind(this);
      this.closeShareDropdown = this.closeShareDropdown.bind(this);
  }


  showShareDropdown(event) {
    event.preventDefault();

    this.setState({
      showShareDropdown: true,
    });

    document.addEventListener('click', this.closeShareDropdown);
  }

  closeShareDropdown() {
      this.setState({ showShareDropdown: false }, () => {
        document.removeEventListener('click', this.closeShareDropdown);
      });

}

    render() {
      const url = `https://rockwiththis.com/songs/${this.props.song.id}`

        return (

          <div className="ShareBox">
          <button onClick={this.showShareDropdown} className="shareshareButton"><i className="im im-paperplane"></i></button>


          {
            this.state.showShareDropdown
              ? (
                <div
                  className="shareDropdown"
                  ref={(element) => {
                    this.shareDropdown = element;
                  }}
                >
                    <p>Share </p>
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
              : (
                null
              )
          }
          </div>
        )
    }
}


export default ShareBox
