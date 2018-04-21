import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import YouTube from 'react-youtube'
import { spring, Motion } from 'react-motion'
import AnimateHeight from 'react-animate-height'
import VisibilitySensor from 'react-visibility-sensor'
import { Icon } from 'react-fa'
import styles from './SongsContainer.css'
import HeroPosts from './HeroPosts'
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
        const heroPosts = this.props.posts.slice(0,7)
        const posts = this.props.posts.slice(7).map(this.renderSong)

        return (
            <div className="songsContainer clearfix">
                <HeroPosts
                    posts={heroPosts}
                />
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
