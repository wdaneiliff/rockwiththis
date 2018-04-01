import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { toggleSong, togglePlayPause } from './actions/queue'
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
            currentlyPlayingSongDuration: 0,
            seekPosition: null,
            rcSliderValue: 0,
            isPlaying: this.props.isPlaying,
        }

        this.checkSeekPosition = this.checkSeekPosition.bind(this)
        this.onAfterChangeSlider = this.onAfterChangeSlider.bind(this)
        this.onChangeSlider = this.onChangeSlider.bind(this)
        this.setDurationForSongId = this.setDurationForSongId.bind(this)
        this.updateStorePlayPause = this.updateStorePlayPause.bind(this)
        setTimeout(this.checkSeekPosition, 1000)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentlyPlayingSong && this.props.currentlyPlayingSong.id && nextProps.currentlyPlayingSong !== this.props.currentlyPlayingSong) {
            this.setDurationForSongId(nextProps.currentlyPlayingSong.id)
        }
    }

      onChangeSlider(progress) {
        this.setState({
            rcSliderValue: progress,
        })
    }


    onAfterChangeSlider(progress) {
        if (this.props.currentlyPlayingSong) {
            const newTime = this.state.currentlyPlayingSongDuration * (progress / 100.0)
            window.SC.Widget('sc-player').seekTo(newTime)

            this.setRcSliderValueForProgress(newTime, this.state.currentlyPlayingSongDuration)

            this.checkSeekPosition(false)
        }
    }

    setDurationForSongId(songId) {
        window.SC.Widget('sc-player').getDuration(d => this.setState({ currentlyPlayingSongDuration: d }))
    }

    setRcSliderValueForProgress(seekPosition, duration) {
        this.setState({
            rcSliderValue: (seekPosition / duration) * 100,
        })
    }

    updateStorePlayPause() {
        this.props.togglePlayPause(!this.props.isPlaying)
    }

    checkSeekPosition(repeat = true) {
        if (this.props.currentlyPlayingSong && this.mediaContainer) {
            const mediaContainer = this.mediaContainer.getWrappedInstance()
            const media = mediaContainer.medias[this.props.currentlyPlayingSong.id].getWrappedInstance()
            media.getPosition((position) => {
                if (this.state.currentlyPlayingSongDuration) {
                    this.setRcSliderValueForProgress(position, this.state.currentlyPlayingSongDuration)
                }

                this.setState({ seekPosition: position })
            })
        }

        if (repeat) {
            setTimeout(this.checkSeekPosition, 1000)
        }
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
                  <Link className="songImageLink" to={`/songs/${currentlyPlayingSong.id}`}>
                    <span className="song-title">{currentlyPlayingSong.acf.song_name}</span> <br />
                  </Link>
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
            <img src="http://rockwiththis.com/wp-content/uploads/2018/01/pause-thin.svg" className="main playButton" />
        ) : (
            <img src="http://rockwiththis.com/wp-content/uploads/2018/01/play-white.svg" className="main playButton" />
        )

        return (
            <div className="player-controls">
                <div className="player-controls-buttons">
                    <div id="player-control-button-back" className="player-control-button"><i className="fa fa-step-backward" aria-hidden="true" /></div>
                    <div
                        id="player-control-button-play"
                        className="player-control-button"
                        onClick={this.updateStorePlayPause}
                    >
                        {playPauseButton}
                    </div>
                    <div id="player-control-button-next" className="player-control-button"><i className="fa fa-step-forward" aria-hidden="true" /></div>
                </div>
                <div className="player-duration-bar-wrapper">
                    <div className="player-duration-bar-current-time">{formatTime(this.state.seekPosition)}</div>
                    <div className="player-duration-bar">
                        <Slider
                            min={0}
                            max={100}
                            step={0.5}
                            value={this.state.rcSliderValue}
                            onAfterChange={this.onAfterChangeSlider}
                            onChange={this.onChangeSlider}
                        />
                    </div>
                    <div className="player-duration-bar-song-duration">{formatTime(this.state.currentlyPlayingSongDuration)}</div>
                </div>
            </div>
        )
        /**
        <div className="rc-slider">
             <div className="rc-slider-rail" />
             <div className="rc-slider-track" />
             <div className="rc-slider-step" />
             <div className="rc-slider-handle" />
             <div className="rc-slider-mark" />
         </div>
         */
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
    togglePlayPause: (playPause) => dispatch(togglePlayPause(playPause)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainPlayer)
