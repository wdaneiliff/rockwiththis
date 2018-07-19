import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import OffScreen from './OffScreen'
import { toggleSong, togglePlayPause } from './actions/queue'

const formatTime = (seconds = 0) => {
    const numMinutes = Math.floor(seconds / 60)
    const numSeconds = (Math.floor(seconds % 60)).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    return `${numMinutes}:${numSeconds}`
}

class MainPlayer extends Component {
    constructor(props) {
        super(props)

        this.renderButtons = this.renderButtons.bind(this)
        this.changeSong = this.changeSong.bind(this)
        this.onChangeSlider = this.onChangeSlider.bind(this)
        this.updateStorePlayPause = this.updateStorePlayPause.bind(this)
    }

    onChangeSlider(progress) {
      this.offScreen.player.seekTo(progress)
    }

    updateStorePlayPause() {
        this.props.actions.togglePlayPause(!this.props.isPlaying)
    }

    changeSong(next) {
        this.props.posts.forEach((post, i, arr) => {
            if (post.id === this.props.activeSong.id) {
                const queuePosition = next ? i + 1 : i - 1
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
            <img src="http://rockwiththis.com/wp-content/uploads/2018/01/pause-thin.svg" className="main playButton" />
        ) : (
            <img src="http://rockwiththis.com/wp-content/uploads/2018/01/play-white.svg" className="main playButton" />
        )

        const disableBack = this.props.posts[0] && this.props.posts[0].id === this.props.activeSong.id
        return (
            <div className="player-controls">
                <div className="player-controls-buttons">
                    <button
                        disabled={disableBack}
                        id="player-control-button-back"
                        className={`player-control-button ${disableBack ? 'disabled' : ''}`}
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
                    <div className="player-duration-bar-current-time">{formatTime(this.props.activeSongProgress.playedSeconds)}</div>
                    <div className="player-duration-bar">
                        <Slider
                            min={0}
                            max={1}
                            step={0.001}
                            value={this.props.activeSongProgress.played}
                            onChange={this.onChangeSlider}
                        />
                    </div>
                    <div className="player-duration-bar-song-duration">{formatTime(this.props.activeSongDuration)}</div>
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
                <OffScreen
                  {...this.props}
                  changeSong={() => this.changeSong(true)}
                  ref={(e) => {
                    this.offScreen = e;
                  }} />
            </footer>
        )
    }
}

export default MainPlayer
