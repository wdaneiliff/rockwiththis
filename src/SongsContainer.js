import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import Moment from 'react-moment'
import YouTube from 'react-youtube'
import { spring, Motion } from 'react-motion'
import AnimateHeight from 'react-animate-height'
import VisibilitySensor from 'react-visibility-sensor'
import { Icon } from 'react-fa'
import styles from './SongsContainer.css'
import { toggleSong } from './actions/queue'
import Song from './Song'

class SongsContainer extends Component {
    constructor(props) {
        super(props)

        this.renderSong = this.renderSong.bind(this)

        this.songs = {}
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.queue.isPlaying !== nextProps.queue.isPlaying ||
            this.props.queue.currentlyPlayingSong !== nextProps.queue.currentlyPlayingSong) {

            // if not playing anymore, then pause current song
            // if new song, then stop last song and start next song
        }
    }


    renderSong(song, index) {
        return (
            <Song
                key={`${song.id}`}
                ref={(ref) => { this.songs[song.id] = ref }}
                song={song}
            />
        )
    }

    render() {
        const posts = this.props.posts.map(this.renderSong)
        return (
            <div className="songsContainer">
                {posts}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    posts: state.posts,
    queue: state.posts,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleSong: postId => dispatch(toggleSong(postId)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SongsContainer)
