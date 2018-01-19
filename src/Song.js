import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import $ from 'jquery'
import Moment from 'react-moment'
import { spring, Motion } from 'react-motion'
import AnimateHeight from 'react-animate-height'
import VisibilitySensor from 'react-visibility-sensor'
import { Icon } from 'react-fa'
import YouTube from 'react-youtube'
import styles from './SongsContainer.css'
import { toggleSong } from './actions/queue'

class Song extends Component {
    constructor(props) {
        super(props)

        this.ytPlayer = null

        this.toggleDescription = this.toggleDescription.bind(this)
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

      this.props.toggleSong(id)
    }

    toggleDescription() {

    }

    renderTags() {
        const {
            song
        } = this.props

        const tags = song._embedded['wp:term'][1].map(tag =>
            <span key={tag.name} className="tag" dangerouslySetInnerHTML={{ __html: tag.name }} />)

        return (
            <span className="postTags">
                {tags}
            </span>
        )
    }

    renderMedia() {
        // const {
        //     song
        // } = this.props
        //
        // const {
        //     acf: {
        //         song_name,
        //         youtube_track_id,
        //         sc_track_id,
        //     },
        // } = song
        //
        // if (youtube_track_id) {
        //     return (
        //         <div style={{ position: 'absolute', top: -500 }}>
        //             <YouTube
        //                 ref={(ytPlayer) => { this.ytPlayer = ytPlayer }}
        //                 videoId={youtube_track_id}
        //                 id={`yt-${youtube_track_id}`}
        //             />
        //         </div>
        //     )
        // } else if (sc_track_id) {
        //     return (
        //         <div style={{ position: 'absolute', top: -500 }}>
        //             <iframe
        //                 id={`sc-${sc_track_id}`}
        //                 title={song_name}
        //                 width="100%"
        //                 height="166"
        //                 scrolling="no"
        //                 frameBorder="no"
        //                 src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${sc_track_id}`}
        //             />
        //         </div>
        //     )
        // } else {
            return null
        // }
    }

    renderPlayer() {
        const {
            song,
            currentlyPlayingSong,
            isPlaying,
        } = this.props

        const playPauseButton = song.id === currentlyPlayingSong && isPlaying ? (
            <i className="fa fa-pause-circle-o" aria-hidden="true" />
        ) : (
            <i className="fa fa-play-circle-o" aria-hidden="true" />
        )
        return (
            <div className="singlePostPlayer">
                <button
                    className="singlePostPlayerButton"
                    onClick={() => this.onPressPlay(song)}
                >
                    {playPauseButton}
                </button>
                <p className="singlePostPlayerInfo">
                    <span className="songName">{song.acf.song_name}</span>
                    <span className="by">-</span>
                    <span className="artistName">{song.acf.artist_name}</span>
                </p>
                <div className="singlePostPlayerLinks">
                    <a href="#" className="shareButton"><i className="fa fa-share-alt" aria-hidden="true" /></a>
                    <a href="#" className="spotifyLink"><i className="fa fa-spotify" aria-hidden="true" /></a>
                </div>
            </div>
        )
    }

    renderDescription() {
        const { song } = this.props
        return (
            <div className="bottomContentContainer">
                <p className="songDescription" dangerouslySetInnerHTML={{ __html: song.content.rendered }} />
            </div>
        )
    }

    renderTop() {
        const { song } = this.props
        return (
            <div className="topContentContainer">
                <div className="songInfo">
                    <Link className="postTitleLink" to="/song"><p className="postTitle" dangerouslySetInnerHTML={{ __html: song.title.rendered }} /></Link>
                    <p className="metaInfo">
                      <p className="leftInfo"><span>By </span><span className="postAuthor">{song._embedded.author[0].name}</span> | <span className="postDate"><Moment format="ll" date={song.date} /> | </span></p>
                        {this.renderTags(song)}
                    </p>
                </div>
            </div>
        )
    }

    render() {
        const {
            song,
        } = this.props

        return (
            <div id={song.slug} className="songContainer" key={`${song.id}`}>
              <div className="mobile"></div>
                <div className="imageContainer">
                    <img className="songImage" src={song.better_featured_image.source_url} />
                </div>
                <div className="postContent" >
                    {this.renderTop()}
                    {this.renderPlayer()}
                    {this.renderDescription()}
                    <p onClick={this.toggleDescription} className="toggleDescription">More <br /><Icon name="angle-down" /></p>
                </div>
                {this.renderMedia(song)}
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
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Song)
