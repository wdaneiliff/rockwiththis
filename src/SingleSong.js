import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Song from './Song'
import { toggleSong } from './actions/queue'
import { fetchSingleSong } from './actions/singleSong'

class SingleSong extends Component {
    constructor(props) {
        super(props)
    }



    render() {
        return (
            <div className="SingleSongContainer">
              <p>{this.props.slug}</p>
            </div>
        )
    }
}

SingleSong.propTypes = {
    slug: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const {
        song
    } = state

    return {
          song
      }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSingleSong: () => dispatch(fetchSingleSong()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SingleSong)
