import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSingleSong } from './actions/singleSong'
import SingleSong from './SingleSong'
import Sidebar from './Sidebar'


class SingleSongPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
        this.props.fetchSingleSong()
    }

    render() {
      const slug = this.props.match.params.songId;
        return (
          <div className="singleSongPage">
            <SingleSong slug={slug}/>
            <Sidebar />
          </div>
        )
    }
}


SingleSongPage.propTypes = {
      fetchSingleSong: PropTypes.func.isRequired,
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
)(SingleSongPage)
