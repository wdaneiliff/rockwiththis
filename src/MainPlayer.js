import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { toggleSong, togglePlayPause } from './actions/queue'
import  playButton  from './images/main-player-play-button.svg'
import  pauseButton  from './images/pauseButton.png'

const formatTime = (seconds = 0) => {
    const numMinutes = Math.floor(seconds / 60)
    const numSeconds = (Math.floor(seconds % 60)).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    return `${numMinutes}:${numSeconds}`
}

class MainPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeSongDuration: 0,
            seekPosition: null,
            rcSliderValue: 0,
        }

        this.checkSeekPosition = this.checkSeekPosition.bind(this)
        this.renderButtons = this.renderButtons.bind(this)
        this.changeSong = this.changeSong.bind(this)
        this.onAfterChangeSlider = this.onAfterChangeSlider.bind(this)
        this.onChangeSlider = this.onChangeSlider.bind(this)
        this.setDurationForSongId = this.setDurationForSongId.bind(this)
        this.updateStorePlayPause = this.updateStorePlayPause.bind(this)
        setTimeout(this.checkSeekPosition, 1000)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activeSong && this.props.activeSong.id && nextProps.activeSong !== this.props.activeSong) {
            this.setDurationForSongId(nextProps.activeSong.id)
        }
    }


    onChangeSlider(progress) {
        this.setState({
            rcSliderValue: progress,
        }, this.onAfterChangeSlider)
    }


    onAfterChangeSlider() {
        if (this.props.activeSong) {
            const newTime = this.state.activeSongDuration * (this.state.rcSliderValue / 100.0)
            console.log(newTime)
            window.SC.Widget('sc-player').seekTo(newTime * 1000)

            this.setRcSliderValueForProgress(this.state.rcSliderValue, this.state.activeSongDuration)
            this.checkSeekPosition(false)
        }
    }

    setDurationForSongId(songId) {
        window.SC.Widget('sc-player').getDuration(d => this.setState({ activeSongDuration: (d / 1000) }))
    }

    setRcSliderValueForProgress(seekPosition, duration) {
        this.setState({
            rcSliderValue: (seekPosition / duration) * 100,
        })
    }

    updateStorePlayPause() {
        this.props.actions.togglePlayPause(!this.props.isPlaying)
    }

    checkSeekPosition(repeat = true) {
        if (this.props.activeSong && this.props.activeSong.id) {
            window.SC.Widget('sc-player').getDuration((position) => {
                const activeSongDuration = position / 1000
                this.setState({ activeSongDuration })
            })
            window.SC.Widget('sc-player').getPosition((position) => {
                const seekPosition = position / 1000
                if (this.state.activeSongDuration) {
                    this.setRcSliderValueForProgress(seekPosition, this.state.activeSongDuration)
                }
                this.setState({ seekPosition })
            })
        }

        if (repeat) {
            setTimeout(this.checkSeekPosition, 1000)
        }
    }

    changeSong(next) {
        this.props.posts.find((post, i, arr) => {
            const queuePosition = next ? i + 1 : i - 1
            if (post === this.props.activeSong) {
                this.props.actions.toggleSong(arr[queuePosition])
            }
        })
    }

    renderInfo() {
        const { activeSong } = this.props
        return (
            <div className="player-info">
                <div className="player-info-image-wrapper">
                    <div className="player-image">
                        <Link className="songImageLink" to={`/songs/${activeSong.id}`}>
                            <img className="songImage" src={activeSong.better_featured_image.source_url} alt="" />
                        </Link>
                    </div>
                </div>
                <p className="artist-info">
                    <Link className="songImageLink" to={`/songs/${activeSong.id}`}>
                        <span className="song-title">{activeSong.acf.song_name}</span>
                    </Link> <br />
                  <span className="artist-title">{activeSong.acf.artist_name}</span>
                </p>
            </div>
        )
    }


    renderButtons() {
        const {
            activeSong
        } = this.props

        const playPauseButton = this.props.isPlaying ? (
            <img src={pauseButton} className="main playButton" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"/></svg>

        )

        return (
            <div className="player-controls">
                <div className="player-controls-buttons">
                    <button
                        id="player-control-button-back"
                        className="player-control-button"
                        onClick={() => this.changeSong(false)}
                    >
                      <i className="fa fa-step-backward" aria-hidden="true" />
                    </button>
                    <div
                        id="player-control-button-play"
                        className="player-control-button"
                        onClick={this.updateStorePlayPause}
                    >
                        {playPauseButton}
                    </div>
                    <button
                        id="player-control-button-next"
                        className="player-control-button"
                        onClick={() => this.changeSong(true)}
                    >
                        <i className="fa fa-step-forward" aria-hidden="true" />
                    </button>
                </div>
                <div className="player-duration-bar-wrapper">
                    <div className="player-duration-bar-current-time">{formatTime(this.state.seekPosition)}</div>
                    <div className="player-duration-bar">
                        <Slider
                            min={0}
                            max={100}
                            step={0.5}
                            value={this.state.rcSliderValue}
                            onChange={this.onChangeSlider}
                        />
                    </div>
                    <div className="player-duration-bar-song-duration">{formatTime(this.state.activeSongDuration)}</div>
                </div>
            </div>
        )
    }

    renderShareButtons() {
        return (
            <div className="songSourceContainer">
            <a className="source soundcloud">
              <span>Playing from</span>
              <br/>
              <i className="im im-soundcloud"></i>
            </a>


            </div>
        )
    }

    render() {
        if (!this.props.activeSong) {
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
                    </div>
                    {this.renderShareButtons()}
                </div>
            </footer>
        )
    }
}

export default MainPlayer
