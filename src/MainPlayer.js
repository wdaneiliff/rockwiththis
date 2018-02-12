import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { toggleSong } from './actions/queue'
import MediaContainer from './MediaContainer'
import './MainPlayer.css'

const formatTime = (seconds = 0) => {
    const numMinutes = Math.floor(seconds / 60)
    const numSeconds = (Math.floor(seconds % 60)).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    return `${numMinutes}:${numSeconds}`
}

class MainPlayer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentlyPlayingSongDuration: null,
            seekPosition: null,
        }

        this.checkSeekPosition = this.checkSeekPosition.bind(this)

        setTimeout(this.checkSeekPosition, 1000)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentlyPlayingSong !== this.props.currentlyPlayingSong && this.mediaContainer) {
            const mediaContainer = this.mediaContainer.getWrappedInstance()
            const media = mediaContainer.medias[nextProps.currentlyPlayingSong.id].getWrappedInstance()
            media.getDuration((duration) => {
                this.setState({ currentlyPlayingSongDuration: duration, seekPosition: 0 })
            })
        }
    }

    checkSeekPosition() {
        if (this.props.currentlyPlayingSong && this.mediaContainer) {
            const mediaContainer = this.mediaContainer.getWrappedInstance()
            const media = mediaContainer.medias[this.props.currentlyPlayingSong.id].getWrappedInstance()
            media.getPosition((position) => {
                console.log(position)
                this.setState({ seekPosition: position })
            })
        }

        setTimeout(this.checkSeekPosition, 1000)
    }

    renderInfo() {
        const { currentlyPlayingSong } = this.props

        return (
            <div className="player-info">
                <div className="player-info-image-wrapper">
                    <div className="player-image">
                        <Link className="songImageLink" to={`/songs/${currentlyPlayingSong.id}`}>
                            <img className="songImage" src={currentlyPlayingSong.better_featured_image.source_url} alt="" />
                        </Link>
                    </div>
                </div>
                <p className="artist-info">
                    <span className="song-title">{currentlyPlayingSong.acf.song_name}</span> <br />
                    <span className="artist-title">{currentlyPlayingSong.acf.artist_name}</span>
                </p>
            </div>
        )
    }


    renderButtons() {
        const {
            currentlyPlayingSong,
            isPlaying,
        } = this.props

        const playPauseButton = isPlaying ? (
            <img src="http://rockwiththis.info/wp-content/uploads/2018/01/pause-thin.svg" className="main playButton" />
        ) : (
            <img src="http://rockwiththis.info/wp-content/uploads/2018/01/play-white.svg" className="main playButton" />
        )

        return (
            <div className="player-controls">
                <div className="player-controls-buttons">
                    <div id="player-control-button-back" className="player-control-button"><i className="fa fa-step-backward" aria-hidden="true" /></div>
                    <div
                        id="player-control-button-play"
                        className="player-control-button"
                        onClick={() => this.props.toggleSong(currentlyPlayingSong.id)}
                    >
                        {playPauseButton}
                    </div>
                    <div id="player-control-button-next" className="player-control-button"><i className="fa fa-step-forward" aria-hidden="true" /></div>
                </div>
                <div className="player-duration-bar-wrapper">
                    <div className="player-duration-bar-current-time">{formatTime(this.state.seekPosition)}</div>
                    <div className="player-duration-bar">
                        <div className="rc-slider">
                            <div className="rc-slider-rail" />
                            <div className="rc-slider-track" />
                            <div className="rc-slider-step" />
                            <div className="rc-slider-handle" />
                            <div className="rc-slider-mark" />
                        </div>
                    </div>
                    <div className="player-duration-bar-song-duration">{formatTime(this.state.currentlyPlayingSongDuration)}</div>
                </div>
            </div>
        )
    }

    renderShareButtons() {
        return (
            <div className="songSourceContainer">
                <i className="fa fa-soundcloud" aria-hidden="true" />
                <i className="fa fa-youtube-square" aria-hidden="true" />
            </div>
        )
    }

    render() {
        if (!this.props.currentlyPlayingSong) {
            return (
                <footer>
                    <div className="footer-player">
                        <div className="player-controls-wrapper">
                        </div>
                    </div>
                </footer>
            )
        }

        return (
            <footer>
                <div className="footer-player">
                    {this.renderInfo()}
                    <div className="player-controls-wrapper">
                        {this.renderButtons()}
                        {this.renderShareButtons()}
                    </div>
                </div>
                <MediaContainer ref={(mediaContainer) => { this.mediaContainer = mediaContainer }} />
            </footer>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let currentlyPlayingSong = state.posts.find(post => post.id === state.queue.currentlyPlayingSong)
    if (!currentlyPlayingSong) {
        currentlyPlayingSong = state.posts[0]
    }
    return {
        currentlyPlayingSong,
        isPlaying: state.queue.isPlaying,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleSong: postId => dispatch(toggleSong(postId)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainPlayer)
