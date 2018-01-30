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
      if (this.props.singleSong.id) {
        var singleSong = <Song song={this.props.singleSong} />
      } else {
        var singleSong = <p> </p>
      }
      return (
            <div className="singleSongContainer">
              {singleSong}
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
