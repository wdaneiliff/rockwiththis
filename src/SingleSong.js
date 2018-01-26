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
      const singleSong = this.props.singleSong
      return (
            <div className="SingleSongContainer">
              <p>{singleSong.id}</p>
              <p>{singleSong.slug}</p>
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
