import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Scroll from 'react-scroll';
import { fetchRelatedSongs } from 'actions/relatedSongs'
import { fetchFeaturedPosts } from 'actions/featuredPosts'
import SingleSongContainer from '../SingleSongContainer'
import RelatedSongs from 'components/RelatedSongs/RelatedSongs'
import LoadingComponent from 'components/Loading/LoadingComponent'
import SingleSongPlaceholder from '../SingleSongPlaceholder'

class SingleSongPage extends Component {
    constructor(props) {
      super(props)
      this.state = {
        loading: true,
      }
    }

    componentWillMount() {
      const callback = () => {
        this.setState({
          loading: false,
        }, () => {
          Scroll.animateScroll.scrollToTop()
        })
      }
      this.props.actions.fetchSingleSong(this.props.match.params.id, callback)
    }

    render() {
      const {
          song,
      } = this.props

      return (
          <div className="singleSongPage page">
              {this.state.loading ? <SingleSongPlaceholder />
                  :
                  <Fragment>
                      <SingleSongContainer {...this.props} />
                      <RelatedSongs {...this.props} />
                  </Fragment>

              }
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
