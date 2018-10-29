import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import YouTube from 'react-youtube'
import head from 'images/head.png'
import  pauseButton  from 'images/PAUSE-BUTTON.png'
import  playButton  from 'images/playbutton.svg'


class SongGrid extends Component {
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
        this.props.toggleSong(song)
    }

    updateStorePlayPause(newSong) {
        this.props.togglePlayPause(newSong ? true : !this.props.isPlaying)
    }


    renderTags() {
        const {
            song,
        } = this.props

        const tags = song.sub_genres.map(tag =>
            <span key={tag.name} className="tag" dangerouslySetInnerHTML={{ __html: tag.name }} />)

        return (
            <span className="postTags">
                {tags}
            </span>
        )
    }


    render() {
        const {
            song,
            activeSong,
            isPlaying,
        } = this.props

        const { height } = this.state
        return (
            <div id={song.id} data-index={this.props.index} className={`songContainer ${this.props.activeDiscoverFullSong ? 'activeDiscoverFullSong' : ''}`} key={`${song.id}`} onClick={this.props.updateDiscoverFullSongIndex}>
                <div className="imageContainer">
                  <div className="imageHover">
                    <img src={head} />
                  </div>
                    <img className="songImage" src={song.image_url} />
                </div>
            </div>
        )
    }
}

SongGrid.propTypes = {
    song: PropTypes.object.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    activeSong: PropTypes.object,
}

SongGrid.defaultProps = {
    activeSong: {},
}

export default SongGrid
