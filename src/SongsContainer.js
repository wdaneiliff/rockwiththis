import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import YouTube from 'react-youtube'
import { spring, Motion } from 'react-motion'
import AnimateHeight from 'react-animate-height'
import VisibilitySensor from 'react-visibility-sensor'
import { Icon } from 'react-fa'
import HeroPosts from './HeroPosts'
import { toggleSong } from './actions/queue'
import SongGrid from './SongGrid'
import Song from './Song'


class SongsContainer extends Component {
    constructor(props) {
        super(props)

        this.renderSongGrid = this.renderSongGrid.bind(this)
        this.renderSongList = this.renderSongList.bind(this)

        this.songs = {}
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.queue.isPlaying !== nextProps.queue.isPlaying ||
            this.props.queue.currentlyPlayingSong !== nextProps.queue.currentlyPlayingSong) {

            // if not playing anymore, then pause current song
            // if new song, then stop last song and start next song
        }
    }


    renderSongGrid(song, index) {

        return (
            <SongGrid
                key={`${song.id}`}
                ref={(ref) => { this.songs[song.id] = ref }}
                song={song}
            />
        )
    }
    renderSongList(song, index) {
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

        const songGrid = this.props.posts.slice(7).map(this.renderSongGrid)
        const songList = this.props.posts.slice(7).map(this.renderSongList)
        // const posts = this.props.posts.map(this.renderSong)

        return (
            <div className="songsContainer clearfix">
                <HeroPosts
                    posts={heroPosts}
                />
            <div className="discovery-section">

              <div className="songGrid">
                {songGrid}
              </div>
              <div className="songList">
                {songList}
              </div>
            </div>



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
