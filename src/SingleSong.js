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
import { Helmet } from "react-helmet";


class SingleSong extends Component {
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
            <span key={tag.name} className="tag" dangerouslySetInnerHTML={{ __html: tag.name }} />)

        return (
            <span className="postTags">
                {tags}
            </span>
        )
    }

    renderMetaTags() {
        const {
            song,
        } = this.props

        const tags = song._embedded['wp:term'][1].map(tag =>
            <meta name="tag" content={tag.name} />
          )

        return (
            {tags}
        )
    }


    renderPlayer() {
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
          <div className='player-button'>
            <button
                className="singlePostPlayerButton"
                onClick={() => this.onPressPlay(song)}
            >
                {playPauseButton}
            </button>
          </div>
        )
    }

    renderDescription() {
        const { song } = this.props
        return (
              <div className={`bottomContentContainer ${this.state.expanded ? 'expanded' : ''}`}>
                  <p className="songDescription" dangerouslySetInnerHTML={{ __html: song.content.rendered }} />
              </div>
        )
    }

    render() {
        const {
            song,
            currentlyPlayingSong,
            isPlaying,
        } = this.props

        const { height } = this.state

        return (
            <div id={song.slug} className="songContainer" key={`${song.id}`}>
            <Helmet>
              <title>Rock With This - {song.acf.song_name} by {song.acf.artist_name}</title>
              <meta name="song" content={song.acf.song_name} />
              <meta name="artist" content={song.acf.artist_name} />
              <meta name="description" content={song.content.rendered} />
              <meta name="og:image" content={song.better_featured_image.source_url} />
              <meta name="tag" content={song._embedded['wp:term'][1][0].name} />
              ${song._embedded['wp:term'][1][1] ? <meta name="tag" content={song._embedded['wp:term'][1][1].name} /> : ''}
              ${song._embedded['wp:term'][1][2] ? <meta name="tag" content={song._embedded['wp:term'][1][2].name} /> : ''}
              ${song._embedded['wp:term'][1][3] ? <meta name="tag" content={song._embedded['wp:term'][1][3].name} /> : ''}
            </Helmet>
            <div classname="wrapper">
                <div className="imageContainer">
                  <img className="songImage" src={song.better_featured_image.source_url} />
                  <div className="songImageInfoContainer">
                  {this.renderPlayer()}
                    <div className="song-info">
                        <p className="song-title">{song.acf.song_name}</p>
                        <p className="song-artist">{song.acf.artist_name}</p>
                    </div>
                  </div>
                </div>
                <div className="postContent" >

                <div>
                    <div className="songInfo">
                    <div className="topSection">
                    {this.renderPlayer()}
                    <div className="singleSongInfo">
                        <span className="songName">{song.acf.song_name}</span><br />
                        <span className="artistName">{song.acf.artist_name}</span>
                    </div>
                    </div>
                        <p className="metaInfo">
                            <p className="leftInfo"><span className="postDate"><Moment format="ll" date={song.date} /> | </span><span className="postAuthor">Jared Paul</span> </p>|
                            {this.renderTags(song)}
                        </p>
                        <ShareBox props={song.slug} />
                        <a href="#" className="spotify"><i className="fa fa-spotify" aria-hidden="true" /></a>

                    </div>
                </div>
                    {this.renderDescription()}
                </div>
            </div>
          </div>
        )
    }
}

SingleSong.propTypes = {
    song: PropTypes.object.isRequired,
    toggleSong: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    currentlyPlayingSong: PropTypes.number,
}

SingleSong.defaultProps = {
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
)(SingleSong)
