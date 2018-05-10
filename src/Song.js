import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import AnimateHeight from 'react-animate-height'
import { Icon } from 'react-fa'
import YouTube from 'react-youtube'
import { toggleSong, togglePlayPause } from './actions/queue'

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
            <span key={tag.name} className="tag" dangerouslySetInnerHTML={{ __html: tag.name }} />)

        return (
            <span className="postTags">
                {tags}
            </span>
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
            <div className="singlePostPlayer">
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

    renderTop() {
        const { song } = this.props
        return (
            <div className="topContentContainer">
                <div className="songInfo">
                    <Link className="postTitleLink" to={`/songs/${song.id}`}><span className="songName">{song.acf.song_name}</span></Link><br />
                    <span className="artistName">{song.acf.artist_name}</span>
                </div>
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
            <div className="wrapper">
                <div className="imageContainer">
                        <img className="songImage" src={song.better_featured_image.source_url} />
                </div>
                <div className="postContent" >
                  {this.renderPlayer()}
                    {this.renderTop()}
                    <p className="metaInfo">
                        <p className="leftInfo"><span className="postDate"><Moment format="ll" date={song.date} /> | <span className="postAuthor">Jared Paul</span> | </span></p>
                        {this.renderTags(song)}
                    </p>
                    {this.renderDescription()}

                </div>
            </div>
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
