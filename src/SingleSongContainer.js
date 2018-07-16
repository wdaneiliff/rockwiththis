import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SingleSong from './SingleSong'
import { toggleSong } from './actions/queue'

class SingleSongContainer extends Component {
    render() {
      return (
            <div className="singleSongContainer">
              <SingleSong {...this.props} />
            </div>
        )
    }
}

export default SingleSongContainer
