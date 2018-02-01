import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class RelatedSongs extends Component {
    constructor(props) {
        super(props)
    }


    render() {
      return (
            <div className="relatedSongs">
              <p>RELATED SONG</p>
              <p>RELATED SONG</p>
              <p>RELATED SONG</p>
              <p>RELATED SONG</p>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    // singleSong: state.singleSong,
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RelatedSongs)
