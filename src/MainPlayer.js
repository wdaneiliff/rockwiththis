import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import OffScreen from './OffScreen'
import { toggleSong, togglePlayPause } from './actions/queue'
import  playButton  from './images/main-player-play-button.svg'
import  pauseButton  from './images/pauseButton-main-player-new.png'
import  soundCloudImage  from './images/soundcloud-darker.png'

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
            <img src={pauseButton} className="pause-main"/>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"/></svg>

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

            {this.props.activeSong.acf.sc_track_id ?
              <a target="_blank" href={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${this.props.activeSong.acf.sc_track_id}`} className="source soundcloud">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M7 17.939h-1v-8.068c.308-.231.639-.429 1-.566v8.634zm3 0h1v-9.224c-.229.265-.443.548-.621.857l-.379-.184v8.551zm-2 0h1v-8.848c-.508-.079-.623-.05-1-.01v8.858zm-4 0h1v-7.02c-.312.458-.555.971-.692 1.535l-.308-.182v5.667zm-3-5.25c-.606.547-1 1.354-1 2.268 0 .914.394 1.721 1 2.268v-4.536zm18.879-.671c-.204-2.837-2.404-5.079-5.117-5.079-1.022 0-1.964.328-2.762.877v10.123h9.089c1.607 0 2.911-1.393 2.911-3.106 0-2.233-2.168-3.772-4.121-2.815zm-16.879-.027c-.302-.024-.526-.03-1 .122v5.689c.446.143.636.138 1 .138v-5.949z"/></svg>
              </a>
              :
              <div> </div>
            }


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
