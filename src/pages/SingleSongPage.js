import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Scroll from 'react-scroll';
import { fetchRelatedSongs } from 'actions/relatedSongs'
// import { fetchFeaturedPosts } from 'actions/featuredPosts'
import SingleSong from 'components/SingleSong/SingleSong'
import RelatedSongs from 'components/RelatedSongs/RelatedSongs'
import LoadingComponent from 'components/Loading/LoadingComponent'
import SingleSongPlaceholder from 'components/SingleSongPlaceholder/SingleSongPlaceholder'

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

    componentDidUpdate(prevProps) {
        const {scrollTop} = this.state;
        if(this.props.match.params.id !== prevProps.match.params.id){
            this.props.actions.fetchSingleSong(this.props.match.params.id)
        }

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
                  <div className="singleSongContainer">
                      <SingleSong {...this.props} />
                  </div>
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
