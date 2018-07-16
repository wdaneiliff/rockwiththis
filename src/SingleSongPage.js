import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchRelatedSongs } from './actions/relatedSongs'
import { fetchFeaturedPosts } from './actions/featuredPosts'
import SocialLinks from './SocialLinks'
import SingleSongContainer from './SingleSongContainer'
import SidebarRight from './SidebarRight'
import RelatedSongs from './RelatedSongs'
import LoadingComponent from './LoadingComponent'

class SingleSongPage extends Component {
    componentWillMount() {
      this.props.actions.fetchSingleSong(this.props.match.params.id)
      // this.props.fetchRelatedSongs(this.props.match.params.id)
    }

    render() {
      const {
          song,
      } = this.props


        if (!this.props.singleSong || this.props.isFetchingSingleSong) {
            return (
                <LoadingComponent />
            )
        }

        return (
          <div className="singleSongPage page">
              <SingleSongContainer {...this.props} />
              <RelatedSongs {...this.props} />
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

export default SingleSongPage
