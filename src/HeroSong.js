import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import AnimateHeight from 'react-animate-height'
import { Icon } from 'react-fa'
import YouTube from 'react-youtube'
import { toggleSong, togglePlayPause } from './actions/queue'


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
        const {
            id,
            acf: {
                song_name,
                youtube_track_id,
                sc_track_id,
            },
        } = song
        // debugger
        this.updateStorePlayPause(id !== this.props.activeSong.id)
        this.props.actions.toggleSong(id)
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

        const playPauseButton = song.id === activeSong && isPlaying ? (
            <img src="http://www.rockwiththis.com/wp-content/uploads/2018/05/16427.png" className="pauseButton" />
        ) : (
            <img src="http://www.rockwiththis.com/wp-content/uploads/2018/04/unnamed.png" className="playButton" />
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
    toggleSong: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    activeSong: PropTypes.object,
}

HeroSong.defaultProps = {
    activeSong: {},
}

export default HeroSong
