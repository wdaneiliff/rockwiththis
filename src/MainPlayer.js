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
        this.changeSongOnEnd = this.changeSongOnEnd.bind(this)
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

    changeSongOnEnd() {
      // this.props.actions.setSongDuration(0)

      const isCurrentSong = (song) => (song.id === this.props.activeSong.id)
      const currentQueuePosition = this.props.posts.findIndex(isCurrentSong)

      let nextQueuePosition = (currentQueuePosition + 1);
      const isEndOfQueue = (nextQueuePosition >= this.props.posts.length)
      nextQueuePosition = (isEndOfQueue ? 0 : nextQueuePosition)

      this.props.actions.toggleSong(this.props.posts[nextQueuePosition])
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
                    <i className="im im-previous"></i>

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
                    <i className="im im-next"></i>

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
            {this.props.activeSong.acf.youtube_track_id ?
              <a target="_blank" href={`https://www.youtube.com/watch?v=${this.props.activeSong.acf.youtube_track_id}`} className="source youtube">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M4.652 0h1.44l.988 3.702.916-3.702h1.454l-1.665 5.505v3.757h-1.431v-3.757l-1.702-5.505zm6.594 2.373c-1.119 0-1.861.74-1.861 1.835v3.349c0 1.204.629 1.831 1.861 1.831 1.022 0 1.826-.683 1.826-1.831v-3.349c0-1.069-.797-1.835-1.826-1.835zm.531 5.127c0 .372-.19.646-.532.646-.351 0-.554-.287-.554-.646v-3.179c0-.374.172-.651.529-.651.39 0 .557.269.557.651v3.179zm4.729-5.07v5.186c-.155.194-.5.512-.747.512-.271 0-.338-.186-.338-.46v-5.238h-1.27v5.71c0 .675.206 1.22.887 1.22.384 0 .918-.2 1.468-.853v.754h1.27v-6.831h-1.27zm2.203 13.858c-.448 0-.541.315-.541.763v.659h1.069v-.66c.001-.44-.092-.762-.528-.762zm-4.703.04c-.084.043-.167.109-.25.198v4.055c.099.106.194.182.287.229.197.1.485.107.619-.067.07-.092.105-.241.105-.449v-3.359c0-.22-.043-.386-.129-.5-.147-.193-.42-.214-.632-.107zm4.827-5.195c-2.604-.177-11.066-.177-13.666 0-2.814.192-3.146 1.892-3.167 6.367.021 4.467.35 6.175 3.167 6.367 2.6.177 11.062.177 13.666 0 2.814-.192 3.146-1.893 3.167-6.367-.021-4.467-.35-6.175-3.167-6.367zm-12.324 10.686h-1.363v-7.54h-1.41v-1.28h4.182v1.28h-1.41v7.54zm4.846 0h-1.21v-.718c-.223.265-.455.467-.696.605-.652.374-1.547.365-1.547-.955v-5.438h1.209v4.988c0 .262.063.438.322.438.236 0 .564-.303.711-.487v-4.939h1.21v6.506zm4.657-1.348c0 .805-.301 1.431-1.106 1.431-.443 0-.812-.162-1.149-.583v.5h-1.221v-8.82h1.221v2.84c.273-.333.644-.608 1.076-.608.886 0 1.18.749 1.18 1.631v3.609zm4.471-1.752h-2.314v1.228c0 .488.042.91.528.91.511 0 .541-.344.541-.91v-.452h1.245v.489c0 1.253-.538 2.013-1.813 2.013-1.155 0-1.746-.842-1.746-2.013v-2.921c0-1.129.746-1.914 1.837-1.914 1.161 0 1.721.738 1.721 1.914v1.656z"/></svg>
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
                  changeSongOnEnd={this.changeSongOnEnd}
                  ref={(e) => {
                    this.offScreen = e;
                  }} />
            </footer>
        )
    }
}

export default MainPlayer
