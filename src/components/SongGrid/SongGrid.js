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

        this.toggleDescription = this.toggleDescription.bind(this)

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
                    <Link className="postTitleLink" to={`/songs/${song.id}`}><p className="postTitle" dangerouslySetInnerHTML={{ __html: song.title.rendered }} /></Link>
                    <p className="metaInfo">
                        <p className="leftInfo"><span>By </span><span className="postAuthor">Jared Paul</span> | <span className="postDate"><Moment format="ll" date={song.date} /> | </span></p>
                        {this.renderTags(song)}
                    </p>
                </div>
            </div>
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
            <div id={song.slug} data-index={this.props.index} className={`songContainer ${this.props.activeDiscoverFullSong ? 'activeDiscoverFullSong' : ''}`} key={`${song.id}`} onClick={this.props.updateDiscoverFullSongIndex}>
                <div className="imageContainer">
                  <div className="imageHover">
                    <img src={head} />
                  </div>
                    <img className="songImage" src={song.better_featured_image.source_url} />
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
