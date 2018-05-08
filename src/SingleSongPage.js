import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSingleSong } from './actions/singleSong'
import { fetchRelatedSongs } from './actions/relatedSongs'
import { fetchFeaturedPosts } from './actions/featuredPosts'
import SingleSongContainer from './SingleSongContainer'
import SidebarRight from './SidebarRight'
import RelatedSongs from './RelatedSongs'


class SingleSongPage extends Component {
    componentWillMount() {
      this.props.fetchSingleSong(this.props.match.params.id)
      this.props.fetchRelatedSongs(this.props.match.params.id)
    }

    render() {
        if (!this.props.singleSong || this.props.isFetchingSingleSong) {
            return (
                <div>LOADING...</div>
            )
        }

        return (
          <div className="singleSongPage">
              <SingleSongContainer />
          </div>
        )
    }
}


SingleSongPage.propTypes = {
      fetchSingleSong: PropTypes.func.isRequired,
      fetchFeaturedPosts: PropTypes.func.isRequired,
      fetchRelatedSongs: PropTypes.func.isRequired,
      isFetchingSingleSong: PropTypes.bool.isRequired,
      singleSong: PropTypes.shape({}).isRequired,
}

const mapStateToProps = (state, ownProps) => {
    const {
        singleSong,
        featuredPosts,
        relatedSongs,
        isFetchingSingleSong,
    } = state

    return {
        singleSong,
        featuredPosts,
        relatedSongs,
        isFetchingSingleSong,
      }
}

const mapDispatchToProps = { fetchSingleSong, fetchFeaturedPosts, fetchRelatedSongs };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SingleSongPage)
