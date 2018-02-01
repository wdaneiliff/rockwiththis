import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchSingleSong } from './actions/singleSong'
import { fetchFeaturedPosts } from './actions/featuredPosts'
import SingleSong from './SingleSong'
import SidebarRight from './SidebarRight'
import RelatedSongs from './RelatedSongs'


class SingleSongPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchSingleSong(this.props.match.params.id)

  }




  render() {
      return (
        <div className="singleSongPage">
            <button className="backpageButton">
              <Link to="/">
                <img src="http://rockwiththis.info/wp-content/uploads/2018/01/iconmonstr-arrow-72-48.png" />
              </Link>
            </button>
            <SingleSong />
            <SidebarRight />
        </div>
      )
  }
}


SingleSongPage.propTypes = {
      fetchSingleSong: PropTypes.func.isRequired,
      fetchFeaturedPosts: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const {
        singleSong,
        featuredPosts,
    } = state

    return {
        singleSong,
        featuredPosts
      }
}

const mapDispatchToProps = { fetchSingleSong, fetchFeaturedPosts };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SingleSongPage)
