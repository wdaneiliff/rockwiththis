import React, { Component } from 'react'

class ShareBox extends Component {

    render() {
        return (
          <div className="ShareBox">
          <a href="#" className="shareButton"><img src="http://rockwiththis.com/wp-content/uploads/2018/01/iconmonstr-share-2-48.png" /></a>
          <a href="#" className="spotifyLink"><i className="fa fa-spotify" aria-hidden="true" /></a>
          </div>
        )
    }
}


export default ShareBox
