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

  componentDidMount() {

    this.props.fetchSingleSong(this.props.match.params.id)

  }



  render() {
    const slug = this.props.match.params.id;
      return (
        <div className="singleSongPage">
          <SidebarRight />

            <button className="backpageButton">
              <Link to="/">
                <img src="http://rockwiththis.info/wp-content/uploads/2018/01/iconmonstr-arrow-72-48.png" />
              </Link>
            </button>
          <SingleSong slug={slug}/>
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

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   fetchSingleSong: () => dispatch(fetchSingleSong()),
//
// })
const mapDispatchToProps = { fetchSingleSong };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SingleSongPage)
