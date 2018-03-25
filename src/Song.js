import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import AnimateHeight from 'react-animate-height'
import { Icon } from 'react-fa'
import YouTube from 'react-youtube'
import { toggleSong } from './actions/queue'

class Song extends Component {
    constructor(props) {
        super(props)

        this.ytPlayer = null

        this.toggleDescription = this.toggleDescription.bind(this)

        this.state = {
            expanded: false
        }
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

        this.props.toggleSong(id)
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

    renderPlayer() {
        const {
            song,
            currentlyPlayingSong,
            isPlaying,
        } = this.props

        const playPauseButton = song.id === currentlyPlayingSong && isPlaying ? (
            <img src="http://rockwiththis.info/wp-content/uploads/2018/01/pause-thin.svg" className="pauseButton" />
        ) : (
            <img src="http://rockwiththis.info/wp-content/uploads/2018/01/play-white.svg" className="playButton" />
        )
        return (
            <div className="singlePostPlayer">
                <button
                    className="singlePostPlayerButton"
                    onClick={() => this.onPressPlay(song)}
                >
                    {playPauseButton}
                </button>
                <p className="singlePostPlayerInfo">
                    <span className="songName">{song.acf.song_name}</span>
                    <span className="artistName">{song.acf.artist_name}</span>
                </p>
                <div className="singlePostPlayerLinks">
                    <a href="#" className="spotifyLink"><i className="fa fa-spotify" aria-hidden="true" /></a>
                    <a href="#" className="shareButton"><img src="http://rockwiththis.info/wp-content/uploads/2018/01/iconmonstr-share-2-48.png" />

                    </a>
                </div>
            </div>
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
        } = this.props

        const { height } = this.state

        return (
            <div id={song.slug} className="songContainer" key={`${song.id}`}>
                <div className="mobile" />
                <div className="imageContainer">
                    <Link className="songImageLink" to={`/songs/${song.id}`}>
                        <img className="songImage" src={song.better_featured_image.source_url} />
                    </Link>
                </div>
                <div className="postContent" >
                    {this.renderTop()}
                    {this.renderPlayer()}
                    {this.renderDescription()}
                    <p onClick={this.toggleDescription} className="toggleDescription">
                        { !this.state.expanded ? (
                            <p><Icon name="angle-double-down" /></p>
                        ) : (
                            <p><Icon name="angle-double-up" /></p>
                        ) }
                    </p>
                </div>
            </div>
        )
    }
}

Song.propTypes = {
    song: PropTypes.object.isRequired,
    toggleSong: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    currentlyPlayingSong: PropTypes.number,
}

Song.defaultProps = {
    currentlyPlayingSong: null,
}

const mapStateToProps = (state, ownProps) => {
    const {
        isPlaying,
        currentlyPlayingSong,
    } = state.queue

    return {
        isPlaying,
        currentlyPlayingSong,
    }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleSong: postId => dispatch(toggleSong(postId)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Song)
