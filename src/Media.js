import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import AnimateHeight from 'react-animate-height'
import { Icon } from 'react-fa'
import YouTube from 'react-youtube'
import { toggleSong } from './actions/queue'

class Media extends Component {
    constructor(props) {
        super(props)

        this.ytPlayer = null
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentlyPlayingSong !== nextProps.currentlyPlayingSong ||
            this.props.isPlaying !== nextProps.isPlaying
        ) {
            if (nextProps.currentlyPlayingSong === nextProps.song.id && nextProps.isPlaying) {
                this.play()
            } else {
                this.pause()
            }
        }
    }

    pause() {
        console.log('pause()')
        const {
            id,
            acf: {
                song_name,
                youtube_track_id,
                sc_track_id,
            },
        } = this.props.song

        if (youtube_track_id) {
            const player = this.ytPlayer.internalPlayer
            player.pauseVideo()
        } else if (sc_track_id && window.SC) {
            window.SC.Widget(`sc-${sc_track_id}`).pause()
        }
    }

    play() {
        console.log('play()')
        const {
            id,
            acf: {
                song_name,
                youtube_track_id,
                sc_track_id,
            },
        } = this.props.song

        if (youtube_track_id) {
            const player = this.ytPlayer.internalPlayer
            player.playVideo()
        } else if (sc_track_id && window.SC) {
            window.SC.Widget(`sc-${sc_track_id}`).play()
        }
    }

    getDuration(callback) {
        console.log('get duration()')
        const {
            id,
            acf: {
                song_name,
                youtube_track_id,
                sc_track_id,
            },
        } = this.props.song

        if (youtube_track_id) {
            const player = this.ytPlayer.internalPlayer
            callback(player.getDuration())
        } else if (sc_track_id && window.SC) {
            window.SC.Widget(`sc-${sc_track_id}`).getDuration(milliseconds => callback(milliseconds / 1000))
        }
    }

    getPosition(callback) {
        console.log('get duration()')
        const {
            id,
            acf: {
                song_name,
                youtube_track_id,
                sc_track_id,
            },
        } = this.props.song

        if (youtube_track_id) {
            const player = this.ytPlayer.internalPlayer
            callback(player.getCurrentTime())
        } else if (sc_track_id && window.SC) {
            window.SC.Widget(`sc-${sc_track_id}`).getPosition(milliseconds => callback(milliseconds / 1000))
        }
    }

    render() {
        const {
            song,
        } = this.props

        const {
            acf: {
                song_name,
                youtube_track_id,
                sc_track_id,
            },
        } = song

        if (youtube_track_id) {
            return (
                <div style={{ position: 'absolute', top: -500 }}>
                    <YouTube
                        ref={(ytPlayer) => { this.ytPlayer = ytPlayer }}
                        videoId={youtube_track_id}
                        id={`yt-${youtube_track_id}`}
                    />
                </div>
            )
        } else if (sc_track_id) {
            return (
                <div style={{ position: 'absolute', top: -500 }}>
                    <iframe
                        id={`sc-${sc_track_id}`}
                        title={song_name}
                        width="100%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${sc_track_id}`}
                    />
                </div>
            )
        } else {
            return null
        }
    }
}

Media.propTypes = {
    song: PropTypes.object.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    currentlyPlayingSong: PropTypes.number,
}

Media.defaultProps = {
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
    null,
    { withRef: true },
)(Media)
