import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchSingleSong } from './actions/singleSong'
import SingleSong from './SingleSong'
import SidebarRight from './SidebarRight'


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
          <SidebarRight />
            <button className="backpageButton">
              <Link to="/">
                <img src="http://rockwiththis.info/wp-content/uploads/2018/01/iconmonstr-arrow-72-48.png" />
              </Link>
            </button>
            <SingleSong />
        </div>
      )
  }
}


SingleSongPage.propTypes = {
      fetchSingleSong: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const {
        singleSong
    } = state

    return {
        singleSong
      }
}

const mapDispatchToProps = { fetchSingleSong };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SingleSongPage)
