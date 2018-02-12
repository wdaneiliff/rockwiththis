import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Song from './Song'
import { toggleSong } from './actions/queue'
import { fetchSingleSong } from './actions/singleSong'

class SingleSong extends Component {
    render() {
      return (
            <div className="singleSongContainer">
              <Song song={this.props.singleSong} />
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    singleSong: state.singleSong,
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SingleSong)
