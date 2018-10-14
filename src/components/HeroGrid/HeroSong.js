import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import AnimateHeight from 'react-animate-height'
import { Icon } from 'react-fa'
import  playButton  from 'images/playbutton.svg'
import  pauseButton  from 'images/pauseButton.png'
import YouTube from 'react-youtube'
import { toggleSong, togglePlayPause } from 'actions/queue'

class HeroSong extends Component {
    constructor(props) {
        super(props)

        this.ytPlayer = null

        this.state = {
            expanded: false
        }
        this.updateStorePlayPause = this.updateStorePlayPause.bind(this)
    }

    onPressPlay(song) {
        this.updateStorePlayPause(song.id !== this.props.activeSong.id)
        this.props.actions.toggleSong(song)
    }

    updateStorePlayPause(newSong) {
        this.props.actions.togglePlayPause(newSong ? true : !this.props.isPlaying)
    }

    render() {
        const {
            song,
            activeSong,
            isPlaying,
        } = this.props

        const playPauseButton = song.id === activeSong.id && isPlaying ? (
            <img src={pauseButton} className="pauseButton" />
        ) : (
            <img src={playButton} className="playButton" />
        )

          return (
              <div className='post-square-wrapper play'>
                  <button
                      className="heroSongPlayerButton"
                      onClick={() => this.onPressPlay(song)}
                  >
                      {playPauseButton}
                  </button>
              </div>
          )
    }
}

HeroSong.propTypes = {
    song: PropTypes.object.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    activeSong: PropTypes.object,
}

HeroSong.defaultProps = {
    activeSong: {},
}

export default HeroSong
