import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SingleSong from './SingleSong'
import { toggleSong } from './actions/queue'
import { fetchSingleSong } from './actions/singleSong'

class SingleSongContainer extends Component {
    render() {
      return (
            <div className="singleSongContainer">
              <SingleSong song={this.props.singleSong} />
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
)(SingleSongContainer)
