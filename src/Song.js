import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import AnimateHeight from 'react-animate-height'
import { Icon } from 'react-fa'
import YouTube from 'react-youtube'
import { toggleSong, togglePlayPause } from './actions/queue'
import ShareBox from './ShareBox'

class Song extends Component {
    constructor(props) {
        super(props)

        this.ytPlayer = null

        this.toggleDescription = this.toggleDescription.bind(this)

        this.state = {
            expanded: false
        }
        this.updateStorePlayPause = this.updateStorePlayPause.bind(this)
    }

    onPressPlay(song) {
        const {
            id,
            acf: {
                song_name,
                youtube_track_id,
                sc_track_id,
            },
        } = song
        // debugger
        this.updateStorePlayPause(id !== this.props.currentlyPlayingSong)
        this.props.toggleSong(id)
    }

    updateStorePlayPause(newSong) {
        this.props.togglePlayPause(newSong ? true : !this.props.isPlaying)
    }

    toggleDescription() {
        const { height } = this.state

        this.setState({
            expanded: !this.state.expanded
        })
    }

    renderTags() {
        const {
            song,
        } = this.props

        const tags = song._embedded['wp:term'][1].map(tag =>
            <span key={tag.name} className="tag">#{tag.name}</span>)

        return (
            <span className="postTags">
                {tags}
            </span>
        )
    }

    renderTop() {
        const {
            song,
            currentlyPlayingSong,
            isPlaying,
        } = this.props

        const playPauseButton = song.id === currentlyPlayingSong && isPlaying ? (
            <img src="http://www.rockwiththis.com/wp-content/uploads/2018/05/16427.png" className="pauseButton" />
        ) : (
            <img src="http://www.rockwiththis.com/wp-content/uploads/2018/04/unnamed.png" className="playButton" />
        )


        return (

            <div className="topContentContainer" >
              <div className="singlePostPlayer hideMobile">
                  <button
                      className="singlePostPlayerButton"
                      onClick={() => this.onPressPlay(song)}
                  >
                      {playPauseButton}
                  </button>

              </div>

              <div className="songInfo mobile" onClick={ () => this.onPressPlay(song)}>
                  <Link className="postTitleLink" to={`/songs/${song.id}`}><span className="songName">{song.acf.song_name}</span></Link><br />
                    <span className="artistName">{song.acf.artist_name}</span>
              </div>
              <div className="songInfo desktop">
                  <Link className="postTitleLink" to={`/songs/${song.id}`}><span className="songName">{song.acf.song_name}</span></Link><br />
                    <span className="artistName">{song.acf.artist_name}</span>
              </div>

              <p className="metaInfo">
                  <p className="leftInfo"><span className="postDate"><Moment format="ll" date={song.date} /> | <span className="postAuthor">Jared Paul</span> | </span></p>
                  {this.renderTags(song)}
                  <ShareBox song={song.slug} />
                  <a href="#" className="spotify"><i className="fa fa-spotify" aria-hidden="true" /></a>


              </p>
              <div className={`bottomContentContainer ${this.state.expanded ? 'expanded' : ''}`}>
                  <p className="songDescription" dangerouslySetInnerHTML={{ __html: song.content.rendered }} />
              </div>
            </div>
        )
    }

    // renderDescription() {
    //     const { song } = this.props
    //     return (
    //           <div className={`bottomContentContainer ${this.state.expanded ? 'expanded' : ''}`}>
    //               <p className="songDescription" dangerouslySetInnerHTML={{ __html: song.content.rendered }} />
    //           </div>
    //     )
    // }

    render() {
        const {
            song,
            currentlyPlayingSong,
            isPlaying,
        } = this.props

        const playPauseButton = song.id === currentlyPlayingSong && isPlaying ? (
            <img src="http://www.rockwiththis.com/wp-content/uploads/2018/05/16427.png" className="pauseButton" />
        ) : (
            <img src="http://www.rockwiththis.com/wp-content/uploads/2018/04/unnamed.png" className="playButton" />
        )

        const { height } = this.state

        return (
            <div id={song.slug} className="songContainer clearfix" key={`${song.id}`}>
            <div className="wrapper"  >
                <div className="postContent" >
                <div className="imageContainer" onClick={ () => this.onPressPlay(song)}>
                        <img className="songImage" src={song.better_featured_image.source_url} />
                        <div className="songImageInfoContainer grid">
                          <button
                              className="singlePostPlayerButton"
                              onClick={() => this.onPressPlay(song)}
                          >
                              {playPauseButton}
                          </button>
                          <div className="song-info">
                              <p className="song-title">{song.acf.song_name}</p>
                              <p className="song-artist">{song.acf.artist_name}</p>
                          </div>
                        </div>
                </div>
                    {this.renderTop()}
                </div>
            </div>
            <Link className="goToSongPage" to={`/songs/${song.id}`}>
              <i class="im im-angle-right"></i>
            </Link>
            <Link className="seeMore" to={`/songs/${song.id}`}>
              <span>...see more</span>
                <i class="im im-angle-right"></i>
            </Link>
            <hr />


            </div>
        )
    }
}

Song.propTypes = {
    song: PropTypes.object.isRequired,
    toggleSong: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    currentlyPlayingSong: PropTypes.number,
}

Song.defaultProps = {
    currentlyPlayingSong: null,
}

const mapStateToProps = (state, ownProps) => {
    const {
        isPlaying,
        currentlyPlayingSong,
    } = state.queue

    return {
        isPlaying,
        currentlyPlayingSong,
    }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleSong: postId => dispatch(toggleSong(postId)),
    togglePlayPause: (playPause) => dispatch(togglePlayPause(playPause)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Song)
