import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSingleSong } from './actions/singleSong'
import SingleSong from './SingleSong'
import SidebarRight from './SidebarRight'


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
            <SidebarRight />
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
